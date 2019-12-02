const config = require('./config.js');

module.exports = {
    ...config,
    testRegex: '\\.int\\.(j|t)s$',
    globalSetup: '<rootDir>/../jest/env-seed.ts',
};
