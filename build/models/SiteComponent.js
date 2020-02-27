import fs from "fs"
import path from "path"
import readdirAsync from "recursive-readdir"

const ENCODING = "utf8"

export default class SiteComponent {

    constructor(inputDirectory) {
        this.inputDirectory = inputDirectory
        this.partialMap = {}
        this.templates = []
        this.stylePaths = []
        this.scriptPaths = []
        this.otherPaths = []
    }

    async loadAsync() {

        // Group paths in the input directory by "logical" file type
        const templatePaths = []
        const partialPaths = []
        const filePaths = await readdirAsync(this.inputDirectory)
        for (let p=0; p<filePaths.length; ++p) {
            const filePath = filePaths[p]

            let pathArr
            if (filePath.includes(SiteComponent.TemplateExtension))
                pathArr = (path.basename(filePath).startsWith(SiteComponent.PartialPrefix)) ? partialPaths : templatePaths
            else if (filePath.slice(-SiteComponent.StyleExtension.length) === SiteComponent.StyleExtension)
                pathArr = this.stylePaths
            else if (filePath.slice(-SiteComponent.ScriptExtension.length) === SiteComponent.ScriptExtension)
                pathArr = this.scriptPaths
            else
                pathArr = this.otherPaths

            pathArr.push(filePath)
        }

        // Load templates
        const allTemplatesPromise = Promise
            .all(templatePaths.map(p => SiteComponent.readFileAsync(p)))
            .then(templateContents =>
                this.templates = templatePaths.map((filePath, p) => {
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
                this.partialMap = Object.fromEntries(
                    partialPaths.map((filePath, p) => {
                        const extIndex = filePath.indexOf(SiteComponent.TemplateExtension)
                        const partialName = path.basename(filePath.substring(0, extIndex)).substring(1);
                        return [ partialName, partialContents[p] ];
                    })
                )
            })

        await Promise.all([ allTemplatesPromise, allPartialsPromise ])

        return this
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
