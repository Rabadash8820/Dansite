import path from "path"
import { fileURLToPath } from "url"

import SiteBuilder from "./SiteBuilder.js"
import SiteComponent from "./SiteComponent.js"
import htmlMinifier from "./htmlMinifier.rc.js"
import cleanCss from "./cleanCss.rc.js"

import AboutComponent from "../about/AboutComponent.ignored.js"
import ProjectsComponent from "../projects/ProjectsComponent.ignored.js"
import ContactComponent from "../contact/ContactComponent.ignored.js"

import englishText from "../build/i18n/index.en-US.js"

const BUILD_DIR = path.dirname(fileURLToPath(import.meta.url)) + "/"
const SRC_DIR = path.normalize(BUILD_DIR + "../")
const OUT_DIR = path.normalize(SRC_DIR + "../dist/")

const PageSlug = {
    About: "about",
    Projects: "projects",
    Contact: "contact",
};

(async function() {

    const siteOptions = {
        sourceDir: SRC_DIR,
        outDir: OUT_DIR,
        indexTemplatePath: SRC_DIR + "index" + SiteComponent.MarkupTemplateExtension,
        culture: "en-US",
        htmlMinifier: htmlMinifier,
        cleanCss: cleanCss,
        viewModel: Object.assign(englishText, { }),
        pages: [
            {
                slug: PageSlug.About,
                bodyPartial: "about",
                component: new AboutComponent(),
                outPath: path.normalize(OUT_DIR + "about/"),
            },
            {
                slug: PageSlug.Projects,
                bodyPartial: "projects",
                component: new ProjectsComponent(),
                outPath: path.normalize(OUT_DIR + "projects/"),
            },
            {
                slug: PageSlug.Contact,
                bodyPartial: "contact",
                component: new ContactComponent(),
                outPath: path.normalize(OUT_DIR + "contact/"),
            }
        ]
    };   // Apparently some weird TypeError results if the statement before the async IIFE doesn't have a semicolon

    await new SiteBuilder().buildSite(siteOptions)

})()
