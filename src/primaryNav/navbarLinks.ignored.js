import SiteComponent from "../build/SiteComponent.js"
import englishText from "./i18n/en-US.ignored.js"

import deepmerge from "deepmerge"

export default function(pageSlug) {
    const navbarLinks = {
        about: {
            href: "/about" + SiteComponent.MarkupExtension,
        },
        projects: {
            href: "/projects" + SiteComponent.MarkupExtension
        },
        contact: {
            href: "/contact" + SiteComponent.MarkupExtension
        },
    }
    navbarLinks[pageSlug].active = deepmerge(navbarLinks[pageSlug].active, englishText.activeLink)

    const localizedLinks = deepmerge(navbarLinks, englishText.navbarLinks)
    const vm = Object.assign({}, englishText.navbar, { navbarLinks: Object.values(localizedLinks) })
    return {
        primaryNav: vm
    }
}
