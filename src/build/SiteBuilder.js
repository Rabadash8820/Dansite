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

async function renderPageAsync(pageOptions, siteOptions) {
    // Load all components
    console.log(`Loading components for page ${pageOptions.slug}...`)
    const loadResult = await pageOptions.component.loadAsync(siteOptions)
    if (loadResult.partialMap.hasOwnProperty(pageOptions.bodyPartial)) {
        loadResult.partialMap.body = loadResult.partialMap[pageOptions.bodyPartial]
        delete loadResult.partialMap[pageOptions.bodyPartial]
    }

    // Build view model
    const viewModel = Object.assign(loadResult.viewModel, siteOptions.viewModel)

    // Create a partial template for the concatenated styles
    const css = (
        await Promise.all(loadResult.paths.styles.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")
    const cleanCssOutput = await _cleanCss
        .minify(css)
        .catch(e => console.error(`Error while minifying CSS for page '${pageOptions.title}': ${e}`))
    loadResult.partialMap.styles = cleanCssOutput.styles

    // Create a partial template for the concatenated scripts
    loadResult.partialMap.scripts = (
        await Promise.all(loadResult.paths.scripts.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")

    await fs.promises.mkdir(pageOptions.outPath)

    // Render markup template using all partials
    const indexTemplate = await SiteComponent.readFileAsync(siteOptions.indexTemplatePath)
    const rendered = Mustache.render(indexTemplate, viewModel, loadResult.partialMap)
    const minifiedHtml = htmlMinifier.minify(rendered, siteOptions.htmlMinifier)
    const htmlFilePath = pageOptions.outPath.substring(0, pageOptions.outPath.length - 1) + SiteComponent.MarkupExtension
    console.log(`Saving page '${pageOptions.slug}' at '${htmlFilePath}`)
    const markupPromise = SiteComponent.writeFileAsync(htmlFilePath, minifiedHtml)

    // Render non-markup templates using all partials
    const templatesPromise = Promise.all(
        loadResult.templates.map(t => {
            const outPath = path.normalize(siteOptions.outDir + path.relative(siteOptions.sourceDir, pageOptions.component.inputDirectory) + "/" + t.relativePath)
            const rendered = Mustache.render(t.contents, viewModel, loadResult.partialMap)
            return fs.promises
                .mkdir(path.dirname(outPath), { recursive: true })
                .then(() => SiteComponent.writeFileAsync(outPath, rendered))
        })
    )

    // Output other files from all components
    const othersPromise = Promise.all(
        loadResult.paths.other.map(p =>
            SiteComponent.readFileAsync(p, null)
            .then(otherContents => {
                const outPath = siteOptions.outDir + path.relative(siteOptions.sourceDir, p)
                return fs.promises
                    .mkdir(path.dirname(outPath), { recursive: true })
                    .then(() => SiteComponent.writeFileAsync(outPath, otherContents, null))
            })
        )
    )

    await Promise.all([ markupPromise, templatesPromise, othersPromise ])
}
