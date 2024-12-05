const { defineConfig } = require('cypress');
const webpackConfig = require('./webpack.config.js');
const { devServer } = require('@cypress/webpack-dev-server');

module.exports = defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig,
    },
    specPattern: 'cypress/components/**/*.spec.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/component-index.html',
    supportFile: false,
  },
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 10000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});