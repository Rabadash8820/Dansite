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

    // Load all components
    let numErrs = 0;
    const components = await Promise.all(
        pageOptions.componentDirectories.map(dir =>
            new SiteComponent(dir)
                .loadAsync()
                .catch(reason => { ++numErrs; console.error(`Error loading component from directory ${dir}: ${reason}`); })
                .then(component => {
                    if (component.partialMap.hasOwnProperty(pageOptions.bodyPartial)) {
                        component.partialMap.body = component.partialMap[pageOptions.bodyPartial]
                        delete component.partialMap[pageOptions.bodyPartial]
                    }
                    return component
                })
        )
    )
    if (numErrs > 0)
        return;
    const allPartials = Object.assign.apply(null, [ {} ].concat(components.map(c => c.partialMap)))   // Equivalent to calling Object.assign({}, component1.partialMap, component2.partialMap, ...)

    // Log what was loaded
    const logMsg = 
        `Loaded page '${pageOptions.title}' from ${components.length} components:\n` +
        components.map(c =>
            "\t" + c.inputDirectory + "\n" +
            (c.templates.length === 0 ? "" : `\t\tTemplates: [ ${c.templates.map(x => x.name).filter(x => x).join(", ")} ]\n`) +
            (c.partialMap === {} ? "" : `\t\tPartials:  [ ${Object.keys(c.partialMap).map(x => x).filter(x => x).join(", ")} ]\n`) +
            (c.stylePaths.length === 0 ? "" : `\t\tStyles:    [ ${c.stylePaths.map(x => path.relative(c.inputDirectory, x)).filter(x => x).join(", ")} ]\n`) +
            (c.scriptPaths.length === 0 ? "" : `\t\tScripts:   [ ${c.scriptPaths.map(x => path.relative(c.inputDirectory, x)).filter(x => x).join(", ")} ]\n`) +
            (c.otherPaths.length === 0 ? "" : `\t\tOther:     [ ${c.otherPaths.map(x => path.relative(c.inputDirectory, x)).filter(x => x).join(", ")} ]\n`)
        ).join("")
    console.log(logMsg)

    // Create a partial template for the concatenated styles
    const allStylePaths = components.flatMap(c => c.stylePaths)
    const css = (
        await Promise.all(allStylePaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")
    const cleanCssOutput = await _cleanCss
        .minify(css)
        .catch(e => console.error(`Error while minifying CSS for page '${pageOptions.title}': ${e}`))
    allPartials.pageStyles = cleanCssOutput.styles

    // Create a partial template for the concatenated scripts
    const allScriptPaths = components.flatMap(c => c.scriptPaths)
    allPartials.pageScripts = (
        await Promise.all(allScriptPaths.map(p => SiteComponent.readFileAsync(p)))
    ).reduce((previousValue, currentValue) => previousValue + currentValue, "")

    await fs.promises.mkdir(pageOptions.outPath)

    // Render markup template using all partials
    const indexTemplate = await SiteComponent.readFileAsync(siteOptions.indexTemplatePath)
    const rendered = Mustache.render(indexTemplate, fullViewModel, allPartials)
    const minifiedHtml = htmlMinifier.minify(rendered, siteOptions.htmlMinifier)
    const htmlFilePath = pageOptions.outPath.substring(0, pageOptions.outPath.length - 1) + SiteComponent.MarkupExtension
    console.log(`Saving page '${pageOptions.title}' at '${htmlFilePath}`)
    const markupPromise = SiteComponent.writeFileAsync(htmlFilePath, minifiedHtml)

    // Render non-markup templates using all partials
    const templatesPromise = Promise.all(
        components
            .flatMap(c =>
                c.templates.map(t => {
                    const outPath = path.normalize(siteOptions.outDir + path.relative(siteOptions.sourceDir, c.inputDirectory) + "/" + t.relativePath)
                    const rendered = Mustache.render(t.contents, fullViewModel, allPartials)
                    return fs.promises
                        .mkdir(path.dirname(outPath), { recursive: true })
                        .then(() => SiteComponent.writeFileAsync(outPath, rendered))
                })
            )
    )

    // Output other files from all components
    const allOtherPaths = components.flatMap(c => c.otherPaths)
    const othersPromise = Promise.all(
        allOtherPaths.map(p =>
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
