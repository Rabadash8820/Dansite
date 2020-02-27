import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

import feather from "feather-icons"
import Mustache from "mustache"

import contactInfo from "./data/contactInfo.js"
import projectGroups from "./data/projects.js"
import education from "./data/education.js"
import skillGroups from "./data/skills.js"
import jobs from "./data/jobs.js"

import SiteBuilder from "./models/SiteBuilder.js"
import SiteComponent from "./models/SiteComponent.js"
import formatDate from "./models/formatDate.js"
import htmlMinifier from "./models/htmlMinifier.rc.js"
import cleanCss from "./models/cleanCss.rc.js"

const BUILD_DIR = path.dirname(fileURLToPath(import.meta.url)) + "/"
const SRC_DIR = path.normalize(BUILD_DIR + "../src/")
const SHARED_DIR_NAME = "shared/"
const SHARED_DIR = path.normalize(SRC_DIR + SHARED_DIR_NAME)
const DATA_DIR = path.normalize(BUILD_DIR + "data/")
const PROJECT_PARTIALS_DIR = path.normalize(DATA_DIR + "project-partials/")
const OUT_DIR = path.normalize(BUILD_DIR + "../dist/")

const PageId = {
    About: 0,
    Projects: 1,
    Contact: 2,
}

const siteOptions = {
    siteTitle: "The Dansite",
    sourceDir: SRC_DIR,
    outDir: OUT_DIR,
    indexTemplatePath: SRC_DIR + "index" + SiteComponent.MarkupTemplateExtension,
    contactInfo: contactInfo,
    currentYear: new Date().getFullYear(),
    navbarLinks: [
        { id: PageId.About, label: "About", href: "/about" + SiteComponent.MarkupExtension },
        { id: PageId.Projects, label: "Projects", href: "/projects" + SiteComponent.MarkupExtension },
        { id: PageId.Contact, label: "Contact", href: "/contact" + SiteComponent.MarkupExtension },
    ],
    htmlMinifier: htmlMinifier,
    cleanCss: cleanCss,
    pages: [
        {
            id: PageId.About,
            title: "About",
            heading: "Who is Dan?",
            viewModelFactory: getAboutViewModels,
            bodyPartial: "about",
            componentDirectories: [
                path.normalize(SRC_DIR + "about/"),
                SHARED_DIR,
                path.normalize(SRC_DIR + "headingLink/")
            ],
            outPath: path.normalize(OUT_DIR + "about/"),
        },
        {
            id: PageId.Projects,
            title: "Projects",
            heading: "Projects",
            viewModelFactory: getProjectsViewModels,
            bodyPartial: "projects",
            componentDirectories: [
                path.normalize(SRC_DIR + "projects/"),
                SHARED_DIR,
                path.normalize(SRC_DIR + "headingLink/")
            ],
            outPath: path.normalize(OUT_DIR + "projects/"),
        },
        {
            id: PageId.Contact,
            title: "Contact",
            heading: "Contact",
            viewModelFactory: getContactViewModels,
            bodyPartial: "contact",
            componentDirectories: [
                path.normalize(SRC_DIR + "contact/"),
                SHARED_DIR
            ],
            outPath: path.normalize(OUT_DIR + "contact/"),
        }
    ]
};   // Apparently some weird TypeError results if the statement before the async IIFE doesn't have a semicolon

(async () => {

    await new SiteBuilder().buildSite(siteOptions)

})()

async function getAboutViewModels() {
    return await Promise.resolve({
        aboutSection: {
            id: "about",
            heading: "Who is Dan?",
            level: "2"
        },
        skillsSection: {
            heading: {
                id: "skills",
                heading: "Skills",
                level: "2"
            },
            skillGroups: skillGroups,
        },
        jobsSection: {
            heading: {
                id: "jobs",
                heading: "Where I've Worked",
                level: "2"
            },
            jobs: jobs.map(job => {
                const vmHash = {}

                const whereWhenText = [
                    job.location ? [ job.location.city, job.location.state ].filter(x => x).join(', ') : "",
                    job.dates ? [ formatDate(job.dates.start), formatDate(job.dates.end) ].filter(x => x).join(" - ") : ""
                ].filter(x => x).join(" | ")
                if (whereWhenText !== "")
                    vmHash.whereWhenText = { text: whereWhenText }

                const positionText = job.position ? [ job.position.start, job.position.end ].filter(x => x).join(" - ") : ""
                if (positionText !== "")
                    vmHash.positionText = { text: positionText }

                return Object.assign(vmHash, job)
            }),
        },
        educationSection: {
            heading: {
                id: "education",
                heading: "Where I Got Learned",
                level: "2"
            },
            education: education,
        },
    })
}
async function getProjectsViewModels() {
    const partialPromises = projectGroups.flatMap(g => {
        g.projects.map(project => {
            if (project.links)
                project.links.forEach(link => link.icon = feather.icons[link.icon || "external-link"].toSvg())

            if (project.readMore) {
                const readMorePartialPath = PROJECT_PARTIALS_DIR + project.readMore.partial + SiteComponent.MarkupTemplateExtension
                return fs.promises
                    .readFile(readMorePartialPath, "utf8")
                    .then(value => project.readMore.content = Mustache.render(value, project))
                    .catch(e => { if (e.code !== "ENOENT") console.warn(`'Read more' partial file '${readMorePartialPath}' could not be read: ${JSON.stringify(reason)}`); })
                    .then(() => project.readMore.icon = feather.icons[project.readMore.icon || "chevron-down"].toSvg())
            }
            else
                return Promise.resolve()
        })
    })

    await Promise.all(partialPromises);

    return {
        projectGroups: projectGroups
    }
}
async function getContactViewModels() {
    return await Promise.resolve({
        fields: {
            firstName: {
                fieldId: "firstName",
                label: "First name",
                required: true,
            },
            lastName: {
                fieldId: "lastName",
                label: "Last name",
                required: false,
            },
            email: {
                fieldId: "email",
                label: "Email",
                required: true,
            },
            referral: {
                fieldId: "referral",
                label: "How did you hear about me?",
                required: false,
            },
            message: {
                fieldId: "message",
                label: "Tell me about your project!",
                required: true,
            },
        }
    })
}
