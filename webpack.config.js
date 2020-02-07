const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin  = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const eslintrc = require("./.eslintrc.js");
const babelrc  = require("./.babelrc.js");

module.exports = (env, argv) => {
    const devMode = argv.mode === "development";

    let webpackCfg = {
        entry: {
            index: "./src/index.js"
        },
        output: {
            path: __dirname + "/dist/",
            filename: "[name]-[contenthash].js"
        },

        // devtool: devMode ? 
        //     "eval-source-map" :     // "best quality SourceMaps for development", see https://webpack.js.org/configuration/devtool/#development
        //     "hidden-source-map",    // "Useful if you only want SourceMaps to map error stack traces from error reports", see https://webpack.js.org/configuration/devtool/#production

        module: {
            rules: [
                // Stylesheet rules
                {
                    test: /\.css$/,
                    use: [
                        // { loader: MiniCssExtractPlugin.loader },
                        // { loader: "style-loader", options: { } },
                        // { loader: "css-loader", options: { sourceMap: true } }
                        // "style-loader", "css-loader"
                    ]
                },

                // Script rules
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        { loader: "babel-loader",  options: babelrc },
                        { loader: "eslint-loader", options: eslintrc }
                    ]
                }
            ]
        },

        // optimization: {
        //     minimize: true,
        //     minimizer: [
        //         new OptimizeCSSAssetsPlugin({})
        //     ]
        // },

        plugins: [
            getHtmlPlugin("about", devMode),
            getHtmlPlugin("projects", devMode)
            // new MiniCssExtractPlugin({
            //     filename: "[name]-[contenthash].css"
            // })
        ]
    };

    // Make a clean build in production mode
    if (!devMode)
      webpackCfg.plugins.push(new CleanWebpackPlugin(["dist"]));

    return webpackCfg;
};

function getHtmlPlugin(pageName, devMode) {
    return new HtmlWebpackPlugin({
        title: "Dan Vicarel",
        template: `src/${pageName}.html`,
        filename: `${pageName}.html`,   // Output filename
        inject: "body",   // Inject <script> tags at bottom of <body>, rather than in <head>
        minify: devMode
            ? false
            : {   // Thought these configs weren't necessary if we set minify=true, but apparently they are (https://github.com/jantimon/html-webpack-plugin/issues/1094)
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,

                minifyCSS: true,
                sortAttributes: true,   // See https://www.npmjs.com/package/html-minifier#sorting-attributes--style-classes
                sortClassName: true,
            },
        cache: devMode    // Emit the file only if it was changed
    });
}