// See https://github.com/NYTimes/kyt/blob/master/docs/kytConfig.md
const resolve = require('path').resolve;

module.exports = {
  reactHotLoader: true,
  modifyWebpackConfig: baseConfig => (baseConfig),
  modifyJestConfig: (baseConfig) => {
    // baseConfig.verbose = true

    // Mock the wait helper
    // because jest mock timers dont play nicely with it
    baseConfig.moduleNameMapper = Object.assign({}, baseConfig.moduleNameMapper,
      {
        './wait': resolve(__dirname, '__mocks__/wait.js'),
        './shuffle': resolve(__dirname, '__mocks__/shuffle.js'),
      }
    );

    return baseConfig;
  },
};
