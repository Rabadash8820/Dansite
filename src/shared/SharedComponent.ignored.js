import path from "path"
import { fileURLToPath } from "url"

import englishText from "./i18n/en-US.ignored.js"

import SiteComponent from "../build/SiteComponent.js"
import FooterContentsComponent from "../footerContents/FooterContentComponent.ignored.js"

import deepmerge from "deepmerge"

export default class SharedComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)

        this.subComponents.push(new SiteComponent(path.normalize(dir + "../primaryNav/")))
        this.subComponents.push(new FooterContentsComponent())
    }

    async loadAsync(siteOptions) {
        const result = await super.loadAsync(siteOptions)

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
        }

        result.viewModel = deepmerge.all([ result.viewModel, vm, englishText ])

        return result
    }

}

function getFaviconBySize(squareSize) {
    return {
        href: `shared/favicons/favicon-${squareSize}.png`,
        squareSize: squareSize
    }
}
