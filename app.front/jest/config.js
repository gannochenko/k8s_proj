module.exports = {
    verbose: true,
    rootDir: '../common',
    setupFiles: ['<rootDir>/../jest/setup.js'],
    transform: {
        '^.+\\.ts$': 'ts-jest',
        '^.+\\.js$': 'babel-jest',
    },
};
