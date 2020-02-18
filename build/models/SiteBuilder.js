import del from "del"
import fs from "fs"
import path from "path"
import Mustache from "mustache"
import htmlMinifier from "html-minifier"
import CleanCss from "clean-css"

import SiteComponent from "./SiteComponent.js"

let _cleanCss

export default class SiteBuilder {

    async buildSite(options) {
        _cleanCss = new CleanCss(options.cleanCss)

        await del(options.outDir)
        await fs.promises.mkdir(options.outDir)
        await Promise.all(options.pages.map(pageOpts => renderPageAsync(pageOpts, options)))
    }

}

SiteBuilder.MarkupExtension = ".html"

async function renderPageAsync(options, siteOptions) {
    // Build view model
    const sharedViewModel  = {
        siteTitle: siteOptions.siteTitle,
        pageTitle: options.title,
        navbarLinks: siteOptions.navbarLinks.map(x => ({
            active: (options.id === x.id),
            label: x.label,
            href: x.href
        })),
        pageHeading: options.heading,
        contactInfo: siteOptions.contactInfo,
        currentYear: siteOptions.currentYear,
    }
    const fullViewModel = Object.assign(options.viewModelFactory(), sharedViewModel)

    // Load templates
    const indexComponent = await SiteComponent.fromPathsAsync(options.indexComponentDirectory, options.bodyTemplatePath)
        .catch(reason => console.error(`Error loading index component from directory '${options.indexComponentDirectory}': ${reason}`))
    if (!indexComponent.templates.body) {
        console.error(`Body template of index component not found (expected at '${options.indexComponentDirectory + options.bodyTemplatePath}')`)
        return
    }
    const components = await Promise.all(
        options.subComponentDirectories.map(d =>
            SiteComponent.fromPathsAsync(d, null)
                .catch(reason => console.error(`Error loading component from directory ${d}: ${reason}`))
        )
    )
    const allPartialTemplates = Object.assign.apply(null,
        [ {} ]
        .concat([ indexComponent.templates] )
        .concat(components.map(c => c.templates))
    )   // Equivalent to calling Object.assign({}, indexComponent.templates, component1.templates, component2.templates, ...)

    // Create a partial template for the concatenated styles
    const allStylePaths = components.flatMap(c => c.stylePaths).concat(indexComponent.stylePaths)
    const css = (
        await Promise.all(allStylePaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")
    const cleanCssOutput = await _cleanCss
        .minify(css)
        .catch(e => console.error(`Error while minifying CSS from directory ${options.indexComponentDirectory}: ${e}`))
    allPartialTemplates.pageStyles = cleanCssOutput.styles
    console.error

    // Create a partial template for the concatenated scripts
    const allScriptPaths = components.flatMap(c => c.scriptPaths).concat(indexComponent.scriptPaths)
    allPartialTemplates.pageScripts = (
        await Promise.all(allScriptPaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")

    await fs.promises.mkdir(options.outPath)

    // Render page template with all partials
    const indexTemplate = await SiteComponent.readFileAsync(siteOptions.indexTemplatePath)
    const html = Mustache.render(indexTemplate, fullViewModel, allPartialTemplates)
    const minifiedHtml = htmlMinifier.minify(html, siteOptions.htmlMinifier)
    const htmlFilePath = options.outPath.substring(0, options.outPath.length - 1) + SiteBuilder.MarkupExtension
    await SiteComponent.writeFileAsync(htmlFilePath, minifiedHtml)

    // Output images from all components
    const allImagePaths = components.flatMap(c => c.imagePaths).concat(indexComponent.imagePaths)
    await Promise.all(
        allImagePaths.map(p =>
            SiteComponent.readFileAsync(p, null)
            .then(imageContents => {
                const relPath = path.relative(siteOptions.sourceDir, p)
                SiteComponent.writeFileAsync(siteOptions.outDir + relPath, imageContents, null)
            })
        )
    )
}
