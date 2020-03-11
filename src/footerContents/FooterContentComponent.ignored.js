import path from "path"
import { fileURLToPath } from "url"

// Icons
// Only including the exact ones that we need from Simple Icons, Feather doesn't seem to have this option
import feather from "feather-icons"
import facebookIcon from "simple-icons/icons/facebook.js"
import twitterIcon from "simple-icons/icons/twitter.js"
import gitHubIcon from "simple-icons/icons/github.js"
import linkedInIcon from "simple-icons/icons/linkedin.js"
import stackExchangeIcon from "simple-icons/icons/stackexchange.js"

import SiteComponent from "../build/SiteComponent.js"

export default class FooterContentsComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)
    }

    async loadAsync(pageSlug) {
        const result = await super.loadAsync(pageSlug)

        result.partialMap.footerText = result.partialMap["footerText.en-US"]
        delete result.partialMap["footerText.en-US"]

        const footerVM = {
            footerContents: {
                contactInfo: [
                    {
                        name: "Email",
                        href: "mailto:shundra8820@gmail.com",
                        icon: feather.icons.mail.toSvg()
                    },
                    {
                        name: "Facebook",
                        href: "https://www.facebook.com/dan.vicarel",
                        icon: facebookIcon.svg
                    },
                    {
                        name: "Twitter",
                        href: "https://twitter.com/Rabadash8820",
                        icon: twitterIcon.svg
                    },
                    {
                        name: "GitHub",
                        href: "https://github.com/Rabadash8820",
                        icon: gitHubIcon.svg
                    },
                    {
                        name: "LinkedIn",
                        href: "https://www.linkedin.com/in/daniel-vicarel/",
                        icon: linkedInIcon.svg
                    },
                    {
                        name: "Stack Exchange",
                        href: "https://stackexchange.com/users/4914349/rabadash8820",
                        icon: stackExchangeIcon.svg
                    },
                ],
                currentYear: new Date().getFullYear(),
            }
        }

        result.viewModel = Object.assign(result.viewModel, footerVM)

        return result
    }

}
