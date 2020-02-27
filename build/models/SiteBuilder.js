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

async function renderPageAsync(pageOptions, siteOptions) {
    // Build view model
    const sharedViewModel  = {
        pageTitle: pageOptions.title,
        navbarLinks: siteOptions.navbarLinks.map(x => ({
            active: (pageOptions.id === x.id),
            label: x.label,
            href: x.href
        })),
        pageHeading: pageOptions.heading,
    }
    const fullViewModel = Object.assign(await pageOptions.viewModelFactory(), siteOptions, pageOptions, sharedViewModel)

    // Load templates
    const indexComponent = await SiteComponent.fromPathsAsync(pageOptions.indexComponentDirectory, pageOptions.bodyTemplatePath)
        .catch(reason => console.error(`Error loading index component from directory '${pageOptions.indexComponentDirectory}': ${reason}`))
    if (!indexComponent.templates.body) {
        console.error(`Body template of index component not found (expected at '${pageOptions.indexComponentDirectory + pageOptions.bodyTemplatePath}')`)
        return
    }
    const components = await Promise.all(
        pageOptions.subComponentDirectories.map(d =>
            SiteComponent.fromPathsAsync(d, null)
                .catch(reason => console.error(`Error loading component from directory ${d}: ${reason}`))
        )
    )
    const allPartialTemplates = Object.assign.apply(null,
        [ {} ]
        .concat([ indexComponent.templates ])
        .concat(components.map(c => c.templates))
    )   // Equivalent to calling Object.assign({}, indexComponent.templates, component1.templates, component2.templates, ...)

    // Create a partial template for the concatenated styles
    const allStylePaths = components.flatMap(c => c.stylePaths).concat(indexComponent.stylePaths)
    const css = (
        await Promise.all(allStylePaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")
    const cleanCssOutput = await _cleanCss
        .minify(css)
        .catch(e => console.error(`Error while minifying CSS from directory ${pageOptions.indexComponentDirectory}: ${e}`))
    allPartialTemplates.pageStyles = cleanCssOutput.styles

    // Create a partial template for the concatenated scripts
    const allScriptPaths = components.flatMap(c => c.scriptPaths).concat(indexComponent.scriptPaths)
    allPartialTemplates.pageScripts = (
        await Promise.all(allScriptPaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")

    await fs.promises.mkdir(pageOptions.outPath)

    // Render page template with all partials
    const indexTemplate = await SiteComponent.readFileAsync(siteOptions.indexTemplatePath)
    const html = Mustache.render(indexTemplate, fullViewModel, allPartialTemplates)
    const minifiedHtml = htmlMinifier.minify(html, siteOptions.htmlMinifier)
    const htmlFilePath = pageOptions.outPath.substring(0, pageOptions.outPath.length - 1) + SiteBuilder.MarkupExtension
    await SiteComponent.writeFileAsync(htmlFilePath, minifiedHtml)

    // Output images from all components
    const allImagePaths = components.flatMap(c => c.imagePaths).concat(indexComponent.imagePaths)
    await Promise.all(
        allImagePaths.map(p =>
            SiteComponent.readFileAsync(p, null)
            .then(imageContents => {
                const outPath = siteOptions.outDir + path.relative(siteOptions.sourceDir, p)
                return fs.promises.mkdir(path.dirname(outPath), { recursive: true })
                    .then(() => SiteComponent.writeFileAsync(outPath, imageContents, null))
            })
        )
    )
}
