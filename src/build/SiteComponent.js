import fs from "fs"
import path from "path"
import readdirAsync from "recursive-readdir"

import SiteComponentLoadResult from "./SiteComponentLoadResult.js"

const ENCODING = "utf8"

export default class SiteComponent {

    constructor(inputDirectory) {
        this.inputDirectory = inputDirectory
        this.subComponents = []
    }

    async loadAsync(siteOptions) {

        // Load subcomponents in background
        const subComponentPromises = Promise.all(this.subComponents.map(c => c.loadAsync(siteOptions)))

        // Group paths in the input directory by "logical" file type
        const templatePaths = []
        const partialPaths = []
        const result = new SiteComponentLoadResult()
        const filePaths = await readdirAsync(this.inputDirectory)
        for (let p=0; p<filePaths.length; ++p) {
            const filePath = filePaths[p]

            let pathArr
            if (filePath.includes(SiteComponent.IgnoreExtension))
                pathArr = result.paths.ignored
            else if (filePath.includes(SiteComponent.TemplateExtension))
                pathArr = (path.basename(filePath).startsWith(SiteComponent.PartialPrefix)) ? partialPaths : templatePaths
            else if (filePath.slice(-SiteComponent.StyleExtension.length) === SiteComponent.StyleExtension)
                pathArr = result.paths.styles
            else if (filePath.slice(-SiteComponent.ScriptExtension.length) === SiteComponent.ScriptExtension)
                pathArr = result.paths.scripts
            else
                pathArr = result.paths.other

            pathArr.push(filePath)
        }

        // Load templates
        const allTemplatesPromise = Promise
            .all(templatePaths.map(p => SiteComponent.readFileAsync(p)))
            .then(templateContents =>
                result.templates = templatePaths.map((filePath, p) => {
                    const extIndex = filePath.indexOf(SiteComponent.TemplateExtension)
                    return {
                        name: path.basename(filePath.substring(0, extIndex)),
                        relativePath: path.relative(this.inputDirectory, filePath).replace(SiteComponent.TemplateExtension, "."),
                        contents: templateContents[p]
                    }
                })
            )

        // Load partials
        const allPartialsPromise = Promise
            .all(partialPaths.map(p => SiteComponent.readFileAsync(p)))
            .then(partialContents => {
                result.partialMap = Object.fromEntries(
                    partialPaths.map((filePath, p) => {
                        const extIndex = filePath.indexOf(SiteComponent.TemplateExtension)
                        const partialName = path.basename(filePath.substring(0, extIndex)).substring(1);
                        return [ partialName, partialContents[p] ];
                    })
                )
            })

        await Promise
            .all([ subComponentPromises, allTemplatesPromise, allPartialsPromise ])
            .catch(reason => console.error(`Error while loading component from directory '${this.inputDirectory}': ${reason}`))

        // Log what's been loaded
        const logMsg = "Component at '" + this.inputDirectory + "'\n" +
            (result.templates.length === 0 ? "" : `\t\tTemplates: [ ${result.templates.map(x => x.name).filter(x => x).join(", ")} ]\n`) +
            (result.partialMap === {} ? "" : `\t\tPartials:  [ ${Object.keys(result.partialMap).map(x => x).filter(x => x).join(", ")} ]\n`) +
            (result.paths.styles.length === 0 ? "" : `\t\tStyles:    [ ${result.paths.styles.map(x => path.relative(this.inputDirectory, x)).filter(x => x).join(", ")} ]\n`) +
            (result.paths.scripts.length === 0 ? "" : `\t\tScripts:   [ ${result.paths.scripts.map(x => path.relative(this.inputDirectory, x)).filter(x => x).join(", ")} ]\n`) +
            (result.paths.ignored.length === 0 ? "" : `\t\tIgnored:   [ ${result.paths.ignored.map(x => path.relative(this.inputDirectory, x)).filter(x => x).join(", ")} ]\n`) +
            (result.paths.other.length === 0 ? "" : `\t\tOther:     [ ${result.paths.other.map(x => path.relative(this.inputDirectory, x)).filter(x => x).join(", ")} ]\n`)
        console.log(logMsg)

        // Combine results from this component and all subcomponents
        const subCompResults = await subComponentPromises     // Promises already resolved, so awaiting again will be instant (https://stackoverflow.com/questions/20328073/is-it-safe-to-resolve-a-promise-multiple-times)
        result.partialMap = Object.assign.apply(null, [ result.partialMap ].concat(subCompResults.map(x => x.partialMap)))
        result.templates = result.templates.concat(subCompResults.flatMap(x => x.templates))
        result.viewModel = Object.assign.apply(null, [ result.viewModel ].concat(subCompResults.map(x => x.viewModel)))
        result.paths.styles = result.paths.styles.concat(subCompResults.flatMap(x => x.paths.styles))
        result.paths.scripts = result.paths.scripts.concat(subCompResults.flatMap(x => x.paths.scripts))
        result.paths.other = result.paths.other.concat(subCompResults.flatMap(x => x.paths.other))
        result.paths.ignored = result.paths.ignored.concat(subCompResults.flatMap(x => x.paths.ignored))

        return result
    }

    static async readFileAsync(path, encoding = ENCODING) {
        return await fs.promises
            .readFile(path, encoding)
            .catch(reason => console.error(`Could not read '${path}': ${reason}`))
    }
    static async writeFileAsync(path, data, encoding = ENCODING) {
        return await fs.promises
            .writeFile(path, data, encoding)
            .catch(reason => console.error(`Could not write to '${path}': ${reason}`))
    }
}

SiteComponent.PartialPrefix = "_"
SiteComponent.TemplateExtension = ".mustache."
SiteComponent.MarkupTemplateExtension = SiteComponent.TemplateExtension + "html"
SiteComponent.MarkupExtension = ".html"
SiteComponent.StyleExtension = ".css"
SiteComponent.ScriptExtension = ".js"
SiteComponent.IgnoreExtension = ".ignored."
