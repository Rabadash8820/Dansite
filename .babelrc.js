module.exports = {

  presets: [
      "minify",
      ["@babel/preset-env", {
          targets: {
              browsers: ["last 2 versions"]
          }
      }]
  ],

  plugins: [
      "@babel/plugin-transform-runtime"
  ]

}