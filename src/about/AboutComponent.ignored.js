import path from "path"
import { fileURLToPath } from "url"

import deepmerge from "deepmerge"

import skillGroups from "./data/skillGroups.ignored.js"
import jobs from "./data/jobs.ignored.js"
import education from "./data/education.ignored.js"
import englishText from "./i18n/en-US/en-US.ignored.js"

import SiteComponent from "../build/SiteComponent.js"
import SharedComponent from "../shared/SharedComponent.ignored.js"
import formatDate from "../build/formatDate.js"
import navbarLinks from "../primaryNav/navbarLinks.ignored.js"


export default class AboutComponent extends SiteComponent {

    constructor() {
        const dir = path.dirname(fileURLToPath(import.meta.url)) + "/"
        super(dir)

        this.subComponents.push(new SharedComponent())
        this.subComponents.push(new SiteComponent(path.normalize(dir + "../headingLink/")))
    }

    async loadAsync(siteOptions) {
        const result = await super.loadAsync(siteOptions)

        result.partialMap.aboutText = result.partialMap["aboutText.en-US"]
        delete result.partialMap["aboutText.en-US"]

        const unlocalizedVM = {
            aboutSection: {
                heading: {
                    id: "about",
                    level: "2"
                },
                image: {
                    src: "about/gdex-2019-presentation-720x960-v1.jpg",
                    width: 720,
                    height: 960,
                }
            },
            skillsSection: {
                heading: {
                    id: "skills",
                    level: "2"
                },
                skillGroups: skillGroups,
            },
            jobsSection: {
                heading: {
                    id: "jobs",
                    level: "2"
                },
                jobs: jobs
            },
            educationSection: {
                heading: {
                    id: "education",
                    level: "2"
                },
                education: education
            },
        }

        result.viewModel = deepmerge.all([ result.viewModel, englishText, navbarLinks('about'), unlocalizedVM ])

        result.viewModel.skillsSection.skillGroups = Object.values(result.viewModel.skillsSection.skillGroups)
        result.viewModel.jobsSection.jobs = getTweakedJobs(result.viewModel.jobsSection.jobs)
        result.viewModel.educationSection.education = getTweakedEducation(result.viewModel.educationSection.education)

        return result
    }

}

function getTweakedJobs(jobs) {
    const tweakedJobs =  Object.values(jobs)
    tweakedJobs.forEach((job, j) => {
            const whereWhenText = [
                job.location ? [ job.location.city, job.location.state ].filter(x => x).join(', ') : "",
                job.dates ? [ formatDate(job.dates.start), formatDate(job.dates.end) ].filter(x => x).join(" - ") : ""
            ].filter(x => x).join(" | ")
            if (whereWhenText !== "")
                job.whereWhenText = { text: whereWhenText }

            if (job.image)
                job.image.isFirst = j % 2 === 0

            const positionText = job.position ? [ job.position.start, job.position.end ].filter(x => x).join(" - ") : ""
            if (positionText !== "")
                job.positionText = { text: positionText }
        })

    return tweakedJobs
}
function getTweakedEducation(education) {
    const tweakedEdu = Object.values(education)
    tweakedEdu.forEach(edu => {
            edu.graduationDate = formatDate(edu.graduationDate)
            edu = Object.assign(edu, englishText.educationSection.stats)
        })

    return tweakedEdu
}
