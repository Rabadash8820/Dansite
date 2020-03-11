import path from "path"
import { fileURLToPath } from "url"

import feather from "feather-icons"
import simpleIcons from "simple-icons"

import englishText from "./i18n/en-US.ignored.js"

import SiteComponent from "../build/SiteComponent.js"

export default class SharedComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)

        this.subComponents.push(new SiteComponent(path.normalize(dir + "../primaryNav/")))
    }

    async loadAsync(siteOptions) {
        const result = await super.loadAsync(siteOptions)

        result.partialMap.footerText = result.partialMap["footerText.en-US"]
        delete result.partialMap["footerText.en-US"]

        const vm = {
            favicons: {
                general: [ 57, 76, 96, 128, 192, 228 ].map(getFaviconBySize),
                androidShortcut: getFaviconBySize(196),
                appleTouchIcons: [ 120, 152, 180 ].map(getFaviconBySize),
                ieMeta: {
                    tileColor: "#FFFFFF",
                    10: {
                        tileImage: getFaviconBySize(144).href,
                    },
                    11: {
                        square70x70logoSrc: getFaviconBySize(76).href,
                        square150x150logoSrc: getFaviconBySize(228).href
                    }
                }
            },
            contactInfo: [
                {
                    name: "Email",
                    href: "mailto:shundra8820@gmail.com",
                    icon: feather.icons.mail.toSvg()
                },
                {
                    name: "Facebook",
                    href: "https://www.facebook.com/dan.vicarel",
                    icon: simpleIcons.get("Facebook").svg
                },
                {
                    name: "Twitter",
                    href: "https://twitter.com/Rabadash8820",
                    icon: simpleIcons.get("Twitter").svg
                },
                {
                    name: "GitHub",
                    href: "https://github.com/Rabadash8820",
                    icon: simpleIcons.get("GitHub").svg
                },
                {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/daniel-vicarel/",
                    icon: simpleIcons.get("LinkedIn").svg
                },
                {
                    name: "Stack Exchange",
                    href: "https://stackexchange.com/users/4914349/rabadash8820",
                    icon: simpleIcons.get("Stack Exchange").svg
                },
            ],
            currentYear: new Date().getFullYear(),
        }

        result.viewModel = Object.assign(result.viewModel, vm, englishText)

        return result
    }

}

function getFaviconBySize(squareSize) {
    return {
        href: `shared/favicons/favicon-${squareSize}.png`,
        squareSize: squareSize
    }
}
