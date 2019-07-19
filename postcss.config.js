module.exports = {
  plugins: {
    autoprefixer: {

    },
    "postcss-px-to-viewport": {
      unitToConvert: 'px',
      viewportWidth: 375,
      // viewportHeight: 568, // not now used; TODO: need for different units and math for different properties
      unitPrecision: 5,
      propList: ['*'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',  // vmin is more suitable.
      // selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [/(\/|\\)(src\/pagecreater)(\/|\\)/, /(\/|\\)(node_modules)(\/|\\)/]
    }
  }
}
