import path from "path"
import { fileURLToPath } from "url"

import englishText from "./i18n/en-US.ignored.js"
import navbarLinks from "../primaryNav/navbarLinks.ignored.js"

import secrets from "../build/secrets.js"
import SiteComponent from "../build/SiteComponent.js"
import SharedComponent from "../shared/SharedComponent.ignored.js"
import deepmerge from "deepmerge"

export default class ContactComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)

        this.subComponents.push(new SharedComponent())
    }

    async loadAsync(siteOptions) {
        const result = await super.loadAsync(siteOptions)

        const vm = {
            emailjs: secrets.emailjs,
            scriptTags: [
                { src: "https://www.google.com/recaptcha/api.js", async: true, defer: true },
                { src: "https://cdn.jsdelivr.net/npm/emailjs-com@2.4.1/dist/email.min.js" },
            ],
            fields: {
                firstName: {
                    identifier: "firstName",
                    required: {},
                },
                lastName: {
                    identifier: "lastName",
                },
                email: {
                    identifier: "email",
                    required: {},
                },
                referral: {
                    identifier: "referral",
                },
                message: {
                    identifier: "message",
                    required: {},
                },
            }
        }

        result.viewModel = deepmerge.all([ result.viewModel, englishText, navbarLinks('contact'), vm ])

        return result
    }

}
