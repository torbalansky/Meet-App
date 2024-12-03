module.exports = {
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios|other-es-modules)/)'
    ],
    testEnvironment: process.env.JEST_ENV === 'e2e' ? 'node' : 'jsdom',
    setupFiles: ['./jest.setup.js'],
    setupFilesAfterEnv: ['./jest.setup.js'],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
    },
    testMatch: [
      '**/*.test.js'
    ],
    testTimeout: 30000
  };