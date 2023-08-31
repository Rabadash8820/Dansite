#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { Aspects, Duration, Environment } from 'aws-cdk-lib';
import { DnssecStack } from '../lib/stacks/dnssec-stack';
import { GithubPagesWebsiteStack } from '../lib/stacks/github-pages-website-stack';
import { WebsiteRedirectStack } from '../lib/stacks/website-redirect-stack';
import { CdkAppTaggingAspect } from '../lib/cdk-app-tagging-aspect';
import { HealthCheckAlarmStack } from '../lib/stacks/health-check-alarm-stack';

const dmarcReportRuaEmail = getEnvVariable("DMARC_REPORT_RUA_EMAIL");
const dmarcReportRufEmail = getEnvVariable("DMARC_REPORT_RUF_EMAIL");

// Set up configuration
const TEST_ENV_NAME: string = "test";
const envName: string = process.env.NODE_ENV ?? TEST_ENV_NAME;

const cfgShared = {
    deployRegion: "us-east-2",
    deployAwsAccount: getEnvVariable("DEPLOY_AWS_ACCOUNT"),
    redirectTlsCertificateArn: getEnvVariable("REDIRECT_TLS_CERTIFICATE_ARN"),
    dnssecAlarmSubscribeEmails: getEnvVariable("DNSSEC_ALARM_SUBSCRIBE_EMAILS").split(","),
    healthCheckAlarmSubscribeEmails: getEnvVariable("HEALTH_CHECK_ALARM_SUBSCRIBE_EMAILS").split(","),
    logBucketExpirationDays: 30,

    // These values don't need to be secret since they're publicly visible in DNS anyway
    githubPagesDefaultDomain: "rabadash8820.github.io",
    githubPagesDnsVerificationDomain: "_github-pages-challenge-Rabadash8820",

    dmarcPolicy: "v=DMARC1;" +  // Values documented at https://dmarc.org/overview/ or https://datatracker.ietf.org/doc/html/rfc7489#section-6.3
        "p=reject;" +           // Reject emails that fail DMARC validation; i.e., don't even show them in spam folders
        "adkim=s;aspf=s;" +     // DKIM and SPF domains must both be identical to email From domain

        // Feedback report settings, so we get notified if someone is trying to spoof this domain in email
        "rf=afrf;" +        // Failure report format
        `rua=mailto:${dmarcReportRuaEmail};` +  // Where to send aggregate feedback reports (and max size). Not secrect since this will end up in DNS anyway
        "ri=3600;" +        // How often to send aggregate feedback reports (some mailbox providers may throttle to daily)
        `ruf=mailto:${dmarcReportRufEmail};` +   // Where to send message-specific failure reports (and max size). Not secrect since this will end up in DNS anyway
        "fo=1;",            // Report message-specific failure due to SPF- or DKIM-validation
};
const cfgTest = {
    mainRootDomain: "danvicarel",   // TODO: use a separate root domain for testing
    mainTLD: "com", // TODO: use a cheaper TLD for testing
    redirectTLDs: <string[]>[],   // TODO: register a cheap TLD for testing redirects
    githubPagesDnsVerificationTxtValue: "451fc5bc19df9b09a991f10088779b",   // These TXT values aren't secrets b/c they'll end up in DNS anyway
};
const cfgProd = {
    mainRootDomain: "danvicarel",
    mainTLD: "com",
    redirectTLDs: <string[]>[], // TODO: register .net and .org TLDs for redirecting
    githubPagesDnsVerificationTxtValue: "451fc5bc19df9b09a991f10088779b",
};
const isTestEnv = envName === TEST_ENV_NAME;
const cfgEnvSpecific = isTestEnv ? cfgTest : cfgProd;
const cfg = {
    ...cfgShared,
    ...cfgEnvSpecific,
};

// Validate/sanitize configuration
cfg.mainRootDomain = cfg.mainRootDomain.toLowerCase();
cfg.mainTLD = cfg.mainTLD.toLowerCase();

// Define CDK environments for stacks
const cdkEnv: Environment = {   // Set CDK environment according to AWS CLI profile passed to CDK CLI (see https://docs.aws.amazon.com/cdk/v2/guide/environments.html)
    account: cfg.deployAwsAccount,
    region: cfg.deployRegion,
};
const usEast1Env: Environment = {
    account: cfg.deployAwsAccount,
    region: "us-east-1",    // Some resources require this region
};

const app = new cdk.App();

Aspects.of(app).add(new CdkAppTaggingAspect(`${cfg.mainRootDomain}-website`));

// Set up DNS records for GitHub Pages website on main domain with DNSSEC.
// We need not define a TLS certificate, as GitHub Pages will create one for us.
const mainDomainPascalCase = cfg.mainRootDomain[0].toUpperCase() + cfg.mainRootDomain.substring(1);
const mainTldPascalCase = cfg.mainTLD[0].toUpperCase() + cfg.mainTLD.substring(1);
const mainFqdn = `${cfg.mainRootDomain}.${cfg.mainTLD}`;
const githubPagesWebsiteStack = new GithubPagesWebsiteStack(app, `${mainDomainPascalCase}GithubPagesWebsite`, {
    env: cdkEnv,
    description: `Resources and DNS settings for hosting the personal website at ${mainFqdn} with GitHub Pages`,
    terminationProtection: !isTestEnv,
    apexDomainName: mainFqdn,
    logBucketExpiration: cfg.logBucketExpirationDays ? Duration.days(cfg.logBucketExpirationDays) : undefined,
    githubPagesDefaultDomain: cfg.githubPagesDefaultDomain,
    githubPagesDnsVerificationChallenge: {
        domain: cfg.githubPagesDnsVerificationDomain,
        txtValue: cfg.githubPagesDnsVerificationTxtValue,
    },
});
new DnssecStack(app, `${mainDomainPascalCase}${mainTldPascalCase}Dnssec`, {
    env: usEast1Env,
    description: `DNSSEC settings for the personal website at ${mainFqdn}`,
    terminationProtection: !isTestEnv,
    domainName: mainFqdn,
    alarmSubscribeEmails: cfg.dnssecAlarmSubscribeEmails,
});

// Set up DNS records and other resources for redirecting provided domains to the "main" domain, with DNSSEC
if (cfg.redirectTLDs.length > 0) {
    new WebsiteRedirectStack(app, `${mainDomainPascalCase}WebsiteRedirect`, {
        env: cdkEnv,
        description: `Resources for redirecting requests from "redirect domains" to the personal website at ${mainFqdn}`,
        terminationProtection: !isTestEnv,
        siteDomain: `www.${mainFqdn}`,
        redirectApexDomains: cfg.redirectTLDs.map(tld => `${cfg.mainRootDomain}.${tld}`),
        redirectTlsCertificateArn: cfg.redirectTlsCertificateArn,
        logBucket: githubPagesWebsiteStack.logBucket,
        dmarcPolicy: cfg.dmarcPolicy,
    });
    cfg.redirectTLDs
        .forEach(tld => {
            const tldPascalCase = tld[0].toUpperCase() + tld.substring(1);
            const resourcePrefix: string = mainDomainPascalCase + tldPascalCase;
            const fqdn = `${cfg.mainRootDomain}.${tld}`;
            new DnssecStack(app, resourcePrefix + "Dnssec", {
                env: usEast1Env,
                description: `DNSSEC settings for ${fqdn}`,
                terminationProtection: !isTestEnv,
                domainName: fqdn,
                alarmSubscribeEmails: cfg.dnssecAlarmSubscribeEmails,
            });
        });
}

// Set up health checks and alarms for the main website and its redirect domains
new HealthCheckAlarmStack(app, `${mainDomainPascalCase}HealthCheckAlarms`, {
    env: usEast1Env,
    description: `Health checks and alarms for monitoring the personal website at ${mainFqdn}, and its various "redirect domains"`,
    terminationProtection: !isTestEnv,
    mainApexDomain: mainFqdn,
    redirectApexDomains: cfg.redirectTLDs.map(tld => `${cfg.mainRootDomain}.${tld}`),
    mainDomainHealthCheckStatusMetricPeriod: Duration.minutes(1),
    redirectDomainsHealthCheckStatusMetricPeriod: Duration.minutes(5),
    healthCheckAlarmSubscribeEmails: cfg.healthCheckAlarmSubscribeEmails,
});


function getEnvVariable(name: string, required: boolean = true): string {
    const value = process.env[name];
    if (required && !value)
        throw new Error(`Required environment variable '${name}' not set`);
    return value ?? "";
}