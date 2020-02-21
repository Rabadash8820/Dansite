import path from "path"
import { fileURLToPath } from "url"

import contactInfo from "./data/contactInfo.js"
import projectGroups from "./data/projects.js"
import education from "./data/education.js"
import skillGroups from "./data/skills.js"

import SiteBuilder from "./models/SiteBuilder.js"
import SiteComponent from "./models/SiteComponent.js"
import htmlMinifier from "./models/htmlMinifier.rc.js"
import cleanCss from "./models/cleanCss.rc.js"

const BUILD_DIR = path.dirname(fileURLToPath(import.meta.url)) + "/"
const SRC_DIR = path.normalize(BUILD_DIR + "../src/")
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
    indexTemplatePath: SRC_DIR + "index" + SiteComponent.TemplateExtension,
    contactInfo: contactInfo,
    currentYear: new Date().getFullYear(),
    navbarLinks: [
        { id: PageId.About, label: "About", href: "/about" + SiteBuilder.MarkupExtension },
        { id: PageId.Projects, label: "Projects", href: "/projects" + SiteBuilder.MarkupExtension },
        { id: PageId.Contact, label: "Contact", href: "/contact" + SiteBuilder.MarkupExtension },
    ],
    htmlMinifier: htmlMinifier,
    cleanCss: cleanCss,
    pages: [
        {
            id: PageId.About,
            title: "About",
            heading: "Who is Dan?",
            viewModelFactory: getAboutViewModels,
            indexComponentDirectory: SRC_DIR + "about/",
            bodyTemplatePath: "about" + SiteComponent.TemplateExtension,
            subComponentDirectories: [ SRC_DIR + "shared/", SRC_DIR + "headingLink/" ],
            outPath: OUT_DIR + "about/",
        },
        {
            id: PageId.Projects,
            title: "Projects",
            heading: "Projects",
            viewModelFactory: getProjectsViewModels,
            indexComponentDirectory: SRC_DIR + "projects/",
            bodyTemplatePath: "projects" + SiteComponent.TemplateExtension,
            subComponentDirectories: [ SRC_DIR + "shared/", SRC_DIR + "headingLink/" ],
            outPath: OUT_DIR + "projects/",
        },
        {
            id: PageId.Contact,
            title: "Contact",
            heading: "Contact",
            viewModelFactory: getContactViewModels,
            indexComponentDirectory: SRC_DIR + "contact/",
            bodyTemplatePath: "contact" + SiteComponent.TemplateExtension,
            subComponentDirectories: [ SRC_DIR + "shared/" ],
            outPath: OUT_DIR + "contact/",
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
    return await Promise.resolve({
        projectGroups: projectGroups
    })
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
