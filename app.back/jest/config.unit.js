const config = require('./config.js');

module.exports = {
    ...config,
    testRegex: '\\.test\\.(t|j)s$',
};
