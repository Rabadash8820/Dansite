import fs from "fs"
import path from "path"
import readdirAsync from "recursive-readdir"

const ENCODING = "utf8"

export default class SiteComponent {

    constructor() {
        this.templates = {}
        this.stylePaths = {}
        this.scriptPaths = {}
        this. imagePaths = {}
    }

    async loadPathsAsync(inputDirectory, bodyTemplatePath) {
        const filePaths = await readdirAsync(inputDirectory)

        // Load templates
        const normalizedBodyTemplatePath = path.normalize(inputDirectory + bodyTemplatePath)
        const templateFilePaths = filePaths.filter(p =>
            p.slice(-SiteComponent.TemplateExtension.length) === SiteComponent.TemplateExtension
            && p !== normalizedBodyTemplatePath
        )
        const templateContents = await Promise.all(
            templateFilePaths.map(p => SiteComponent.readFileAsync(p))
        )
        this.templates = Object.fromEntries(
            templateFilePaths
                .map((filePath, p) => {
                    const templateName = path.basename(filePath, SiteComponent.TemplateExtension);
                    return [ templateName, templateContents[p] ];
                })
        )
        if (bodyTemplatePath)
            this.templates.body = await SiteComponent.readFileAsync(normalizedBodyTemplatePath)

        // Load other component files
        this.stylePaths = filePaths.filter(p => p.slice(-SiteComponent.StyleExtension.length) === SiteComponent.StyleExtension)
        this.scriptPaths = filePaths.filter(p => p.slice(-SiteComponent.ScriptExtension.length) === SiteComponent.ScriptExtension)
        this.imagePaths = filePaths.filter(p =>
            SiteComponent.ImageExtensions.some(ext => p.slice(-ext.length) === ext)
        )
    }

    static async fromPathsAsync(inputDirectory, indexFilePath) {
        const component = new SiteComponent()
        await component.loadPathsAsync(inputDirectory, indexFilePath)
        return component
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

SiteComponent.TemplateExtension = ".mustache.html"
SiteComponent.StyleExtension = ".css"
SiteComponent.ScriptExtension = ".js"
SiteComponent.ImageExtensions = [
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
]
