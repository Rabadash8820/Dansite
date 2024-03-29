import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as cf from "aws-cdk-lib/aws-cloudfront";
import * as cfOrigins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import * as util from "../util";

export interface WebsiteRedirectProps extends StackProps {
    /**
     * The full domain TO which requests to any of the {@link redirectApexDomains} will be redirected, at which the website is hosted.
     */
    siteDomain: string;

    /**
     * List of domains FROM which website requests will be redirected to {@link siteDomain}.
     * Domains must be apex domains, e.g., "example.com" not "www.example.com".
     * All new DNS records will be added to the hosted zones for these domains.
     * Using existing zones simplifies DNS validation for TLS certificates during stack creation, and allows you to easily work with record sets not added by this stack.
     */
    redirectApexDomains: string[];

    /**
     * ARN of the ACM certificate for the redirect CDN. Must have subject alternative names for all of the {@link redirectApexDomains}.
     */
    redirectTlsCertificateArn: string,

    /**
     * The bucket to which server access logs will be written for the redirect S3 buckets.
     */
    logBucket: s3.IBucket;

    /**
     * DMARC policy for email sent by Sendinblue.
     * See the {@link https://dmarc.org/overview/ official DMARC overview} or {@link https://datatracker.ietf.org/doc/html/rfc7489#section-6.3 DMARC record format spec}
     * for tags to create a custom DMARC policy.
     */
    dmarcPolicy: string;
}

export class WebsiteRedirectStack extends Stack {
    constructor(scope: Construct, id: string, props: WebsiteRedirectProps) {
        super(scope, id, props);

        if (props.redirectApexDomains.length == 0)
            throw new Error(`No redirect TLDs provided for domain ${props.siteDomain}`);

        const subDomains = ["", "www",];
        const apexDomains = props.redirectApexDomains.map(apex => ({
            domain: apex,
            hostedZone: route53.HostedZone.fromLookup(this, `${util.toPascalCase(apex)}WebsiteHostedZone`, { domainName: apex }),
            resourcePrefix: util.domainToPascalCase(apex),
        }));
        const fqdns = subDomains.flatMap(subDomain => apexDomains.map(apex => {
            const fqdn = (subDomain && subDomain + ".") + apex.domain;
            return {
                fqdn,
                subDomain,
                apexDomain: apex.domain,
                hostedZone: apex.hostedZone,
                resourcePrefix: util.domainToPascalCase(fqdn),    // E.g., www.example.com -> WwwExampleCom
            };
        }));

        // Provision "redirect" S3 bucket
        const redirectBucket = new s3.Bucket(this, "RedirectBucket", {
            // bucketName: Let CloudFormation create a name for us, so deploys don't fail due to global name conflicts around the world. CloudFormation uses fairly readable defaults anyway
            serverAccessLogsBucket: props.logBucket,
            serverAccessLogsPrefix: "site-redirect-bucket/",
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            websiteRedirect: {
                protocol: s3.RedirectProtocol.HTTPS,
                hostName: props.siteDomain,
            },
            // autoDeleteObjects: bucket will always be empty anyway; no need to provision resources for object auto-deletion
            removalPolicy: RemovalPolicy.DESTROY,
        });

        // Provision CloudFront Distribution to redirect connections over HTTP(S) and IPv4/6
        const redirectCdn = new cf.Distribution(this, "RedirectCdn", {
            enabled: true,
            comment: `CDN for redirecting requests from all "redirect domains" to ${props.siteDomain}, over HTTP(S) and IPv4/6`,
            domainNames: fqdns.map(x => x.fqdn),
            // httpVersion: ,   // Use CDK default, currently HTTP2
            enableIpv6: true,
            sslSupportMethod: cf.SSLMethod.SNI,
            // minimumProtocolVersion: ,   // Use CDK default, currently TLS_V1_2_2021
            enableLogging: true,
            logBucket: props.logBucket,
            logFilePrefix: "redirect-cdn/",
            logIncludesCookies: true,
            defaultBehavior: {
                origin: new cfOrigins.S3Origin(redirectBucket, {
                    originShieldRegion: undefined,  // not necessary for these "redirect buckets" since traffic to them will probably stay low as requests are permanently redirected to the main site domain
                    // connectionAttempts: ,    // Use CDK default, currently 3
                    // connectionTimeout: ,     // Use CDK default, currently 10 sec
                }),
                allowedMethods: cf.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
                cachedMethods: cf.CachedMethods.CACHE_GET_HEAD_OPTIONS,
                cachePolicy: cf.CachePolicy.CACHING_DISABLED, // This Distribution is only for redirecting domains, not caching
                viewerProtocolPolicy: cf.ViewerProtocolPolicy.ALLOW_ALL,    // Doesn't really matter, since S3 origin will redirect viewer to HTTPS website URL anyway
                // originRequestPolicy: , // When undefined, origin request includes all headers, cookies, and query strings from cache policy, which for CACHING_DISABLED is none
                responseHeadersPolicy: cf.ResponseHeadersPolicy.SECURITY_HEADERS,
                compress: false,    // Compress automatically compresses CERTAIN file types, not all. Not necessary when just redirecting to the main site
            },
            priceClass: cf.PriceClass.PRICE_CLASS_100,  // We don't need the most global class of CF distribution when redirecting to the main site
            certificate: acm.Certificate.fromCertificateArn(this, "TlsCertificate", props.redirectTlsCertificateArn),
            // TODO: Uncomment this code to define a DNS-validated certificate within this stack, rather than relying on a pre-existing one,
            //       once the `DnsValidatedCertificateProps.validation` field is used by CDK correctly
            // certificate: new acm.DnsValidatedCertificate(this, "TlsCertificate", {
            //     domainName: fqdns[0].fqdn,
            //     hostedZone: fqdns[0].hostedZone,
            //     region: "us-east-1",    // Certificates used for CloudFront distributions must be in us-east-1. This works even if CDK deploys the stack to a different region.
            //     subjectAlternativeNames: fqdns.slice(1).map(x => x.fqdn),
            //     cleanupRoute53Records: true,
            //     validation: acm.CertificateValidation.fromDnsMultiZone(Object.fromEntries(apexDomains.map(x => [x.domain, x.hostedZone]))),
            // }),
            webAclId: undefined,    // We shouldn't need any firewall rules just for redirecting (firewall rules, if any, should exist on the main site)
        });

        // Provision DNS records for apex domains and www subdomains
        const cdnAliasTarget = route53.RecordTarget.fromAlias(new CloudFrontTarget(redirectCdn));
        fqdns.forEach(domain => {
            // CDN alias records
            new route53.ARecord(this, domain.resourcePrefix + "RedirectCdnAliasIpv4", {
                zone: domain.hostedZone,
                comment: `Target ${domain.fqdn} IPv4 traffic to the "redirect CDN"`,
                recordName: domain.subDomain,
                target: cdnAliasTarget,
                // ttl: Must be empty for alias records (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset.html#cfn-route53-recordset-ttl)
            });
            new route53.AaaaRecord(this, domain.resourcePrefix + "RedirectCdnAliasIpv6", {
                zone: domain.hostedZone,
                comment: `Target ${domain.fqdn} IPv6 traffic to the "redirect CDN"`,
                recordName: domain.subDomain,
                target: cdnAliasTarget,
                // ttl: Must be empty for alias records (https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-route53-recordset.html#cfn-route53-recordset-ttl)
            });

            // Certificate Authority Authorization (CAA)
            // A CAA record on the apex domain would cover all subdomains, but we only want ACM to issue certs for the apex and WWW subdomain
            new route53.CaaAmazonRecord(this, domain.resourcePrefix + "AmazonCaa", {
                zone: domain.hostedZone,
                comment: `Allow ${domain.fqdn} certs to be issued by ACM only`,
                recordName: domain.subDomain,
                // ttl: Just use CDK default (30 min currently)
            });
        });

        // Protect redirect domains from email spoofing
        // Values taken from this CloudFlare post: https://www.cloudflare.com/learning/dns/dns-records/protect-domains-without-email/
        apexDomains.forEach(apex => {
            // Null MX record like this only recommended when same domain has an A record. See: https://www.dmarcanalyzer.com/setup-parked-or-inactive-domains/
            new route53.MxRecord(this, apex.resourcePrefix + "NullMx", {
                zone: apex.hostedZone,
                comment: `Assert that no mail server exists for ${apex.domain}`,
                recordName: "",
                values: [{ priority: 0, hostName: "." }],
                // ttl: Just use CDK default (30 min currently)
            });

            new route53.TxtRecord(this, apex.resourcePrefix + "Spf", {
                zone: apex.hostedZone,
                comment: `Assert that nothing can send emails for ${apex.domain}`,
                recordName: "",
                values: ["v=spf1 -all"],
                // ttl: Just use CDK default (30 min currently)
            });
            new route53.TxtRecord(this, apex.resourcePrefix + "SubdomainSpf", {
                zone: apex.hostedZone,
                comment: `Assert that nothing can send emails for *.${apex.domain}`,
                recordName: "*",
                values: ["v=spf1 -all"],
                // ttl: Just use CDK default (30 min currently)
            });
            new route53.TxtRecord(this, apex.resourcePrefix + "Dkim", {
                zone: apex.hostedZone,
                comment: `Empty DKIM public key so that attempted emails from ${apex.domain} cannot be authenticated`,
                recordName: "*._domainkey",
                values: ["v=DKIM1; p="],
                // ttl: Just use CDK default (30 min currently)
            });

            // Using CNAME instead of TXT for duplicate DMARC policies is recommended here: https://www.dmarcanalyzer.com/setup-parked-or-inactive-domains/
            // Main and redirect domains are equally (maximally) strict about SPF/DKIM validation failures, so the latter can still map DMARC requests to the former.
            const siteApexDomain = props.siteDomain.split(".").slice(-2).join(".");
            new route53.CnameRecord(this, apex.resourcePrefix + "DmarcCname", {
                zone: apex.hostedZone,
                comment: ` Map DMARC policy requests for ${apex.domain} to that of ${siteApexDomain}`,
                recordName: "_dmarc",
                domainName: `_dmarc.${siteApexDomain}`
                // ttl: Just use CDK default (30 min currently)
            });
        });
    }

}