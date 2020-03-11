import path from "path"
import { fileURLToPath } from "url"

import feather from "feather-icons"

import projectGroups from "./projectGroups.ignored.js"
import englishText from "./i18n/en-US/en-US.ignored.js"

import SiteComponent from "../build/SiteComponent.js"
import SharedComponent from "../shared/SharedComponent.ignored.js"
import navbarLinks from "../primaryNav/navbarLinks.ignored.js"
import formatDate from "../build/formatDate.js"
import deepmerge from "deepmerge"

export default class ProjectsComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)

        this.subComponents.push(new SharedComponent())
        this.subComponents.push(new SiteComponent(path.normalize(dir + "../headingLink/")))
    }

    async loadAsync(siteOptions) {
        const result = await super.loadAsync(siteOptions)

        result.viewModel = deepmerge.all([ result.viewModel, englishText, navbarLinks('projects'), { projectGroups: projectGroups } ])

        result.viewModel.projectGroups = getTweakedProjectGroups(result.viewModel.projectGroups, result.partialMap)
        delete result.viewModel.readMore

        return result
    }

}

function getTweakedProjectGroups(projectGroups, partialMap){
    const tweakedProjectGroups = Object.values(projectGroups)
    tweakedProjectGroups.forEach(grp => {
        grp.projects = Object.values(grp.projects)
        grp.projects.forEach(project => {
            if (project.links) {
                project.links = Object.values(project.links)
                project.links.forEach(link => link.icon = feather.icons[link.icon || "external-link"].toSvg())
            }

            const dates = project.dates
            if (dates) {
                if (dates.start)
                    dates.start = formatDate(dates.start)
                if (dates.end)
                    dates.end = formatDate(dates.end)
            }

            if (project.links)
                project.links = Object.values(project.links)

            if (project.readMore) {
                const partial = project.readMore.partial
                partialMap[partial] = partialMap[partial + "en-US"]
                delete partialMap[partial + "en-US"]
                const icon = feather.icons[project.readMore.icon || "chevron-down"].toSvg()
                project.readMore = Object.assign(project.readMore, { icon: icon }, englishText.readMore)
            }
        })
    })

    return tweakedProjectGroups
}
