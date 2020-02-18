// Read about the html-minifier options here: https://www.npmjs.com/package/html-minifier#options-quick-reference
export default {
    html5: true,
    decodeEntities: true,
    useShortDoctype: true,
    collapseBooleanAttributes: true,

    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: false,

    removeComments: true,
    removeEmptyAttributes: true,
    removeEmptyElements: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,

    sortAttributes: true,
    sortClassName: true,
}