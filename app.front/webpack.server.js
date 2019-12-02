const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const StartServerPlugin = require('start-server-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, argv) => {
    const pEnv = process.env;
    const development =
        argv.mode === 'development' || pEnv.NODE_ENV === 'development';

    const destinationFolder = path.join(__dirname, 'build');

    return {
        entry: [
            development && 'webpack/hot/poll?1000',
            development ? './src/server/index.dev' : './src/server/index',
        ].filter(x => !!x),
        watch: development,
        target: 'node',
        mode: development ? 'development' : 'production',
        node: {
            __filename: true,
            __dirname: true,
        },
        externals: [
            nodeExternals(
                development ? { whitelist: ['webpack/hot/poll?1000'] } : {},
            ),
        ],
        resolve: {
            extensions: ['.js', '.jsx'],
            symlinks: false,
        },
        module: {
            rules: [
                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },
                {
                    test: /\.jsx?$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/react',
                                    [
                                        '@babel/env',
                                        {
                                            modules: false,
                                            targets: { node: '10.0' },
                                        },
                                    ],
                                ],
                                plugins: [
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-proposal-class-properties',
                                    'babel-plugin-styled-components',
                                ],
                                cacheDirectory: true,
                            },
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(txt|html)$/,
                    use: 'raw-loader',
                },
                {
                    test: /\.(jpe?g|gif|png|svg|ico)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        // https://webpack.js.org/configuration/devtool/
        devtool: development ? 'source-map' : false,
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // new webpack.ProvidePlugin({
            //     _: [path.join(__dirname, `common/lib/lodash.js`), 'default'],
            // }),
            development && new StartServerPlugin('server.js'),
            new webpack.NamedModulesPlugin(),
            development && new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                __CLIENT__: false,
                __SERVER__: true,
                __DEV__: development,
                __TEST__: false,
            }),
            !development &&
                new CopyPlugin([
                    {
                        from: path.join(__dirname, 'package.json'),
                        to: path.join(destinationFolder, 'package.json'),
                    },
                ]),
        ].filter(x => !!x),
        output: {
            path: destinationFolder,
            filename: 'server.js',
            libraryTarget: 'commonjs',
        },
    };
};
