// Read about the html-minifier options here: https://www.npmjs.com/package/html-minifier#options-quick-reference
export default {
    html5: true,
    decodeEntities: true,
    useShortDoctype: true,
    collapseBooleanAttributes: true,

    collapseInlineTagWhitespace: true,
    collapseWhitespace: true,
    conservativeCollapse: true,

    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,

    sortAttributes: true,
    sortClassName: true,
}