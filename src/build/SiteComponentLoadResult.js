export default class SiteComponentLoadResult {

    constructor() {
        this.partialMap = {}
        this.templates = []
        this.viewModel = {}
        this.paths = {
            styles: [],
            scripts: [],
            other: [],
            ignored: [],
        }
    }

}
