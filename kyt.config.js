// See https://github.com/NYTimes/kyt/blob/master/docs/kytConfig.md

module.exports = {
  reactHotLoader: true,
  modifyWebpackConfig: baseConfig => (baseConfig),
  modifyJestConfig: (baseConfig) => {
    // baseConfig.verbose = true
    return baseConfig
  },
}
