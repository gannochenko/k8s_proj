const webpack = require('webpack');
const path = require('path');
const resolve = require('resolve');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin-alt');
const typescriptFormatter = require('react-dev-utils/typescriptFormatter');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');

module.exports = (env, argv) => {
    const pEnv = process.env;
    const development =
        argv.mode === 'development' || pEnv.NODE_ENV === 'development';

    const sourceFolder = path.join(__dirname, 'src/common');
    const buildFolder = path.join(__dirname, 'build');
    const publicFolder = development
        ? buildFolder
        : path.join(buildFolder, 'public');

    const hmrPort = pEnv.NETWORK__PORT__HMR || 3001;
    const bundleAnalyserPort = pEnv.NETWORK__PORT__BUNDLE_ANALYSER || 3010;

    return {
        entry: development
            ? [
                  'react-hot-loader/patch',
                  `webpack-dev-server/client?http://localhost:${hmrPort}`,
                  'webpack/hot/only-dev-server',
                  './src/client/index.dev',
              ]
            : { index: './src/client/index' },
        target: 'web',
        mode: development ? 'development' : 'production',
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
            symlinks: false,
        },
        devtool: development ? 'source-map' : false,
        module: {
            rules: [
                {
                    test: /\.(j|t)sx?$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: require.resolve(
                                    'react-dev-utils/eslintFormatter',
                                ),
                                eslintPath: require.resolve('eslint'),
                                emitWarning: true,
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: sourceFolder,
                },

                {
                    test: /\.(graphql|gql)$/,
                    exclude: /node_modules/,
                    loader: 'graphql-tag/loader',
                },

                {
                    test: /\.(j|t)sx?$/,
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
                                            targets: {
                                                browsers: ['last 2 versions'],
                                            },
                                        },
                                    ],
                                    '@babel/preset-typescript',
                                ],
                                plugins: [
                                    [
                                        '@babel/plugin-proposal-decorators',
                                        { legacy: true },
                                    ],
                                    '@babel/plugin-proposal-object-rest-spread',
                                    '@babel/plugin-proposal-class-properties',
                                    'babel-plugin-styled-components',
                                ],
                                cacheDirectory: true,
                            },
                        },
                    ],
                    include: [path.join(__dirname, 'src/client'), sourceFolder],
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
        plugins: [
            new ForkTsCheckerWebpackPlugin({
                typescript: resolve.sync('typescript', {
                    basedir: path.join(__dirname, 'node_modules'),
                }),
                async: false,
                checkSyntacticErrors: true,
                tsconfig: path.join(__dirname, 'tsconfig.json'),
                compilerOptions: {
                    module: 'esnext',
                    moduleResolution: 'node',
                    resolveJsonModule: true,
                    isolatedModules: true,
                    noEmit: true,
                    jsx: 'preserve',
                },
                reportFiles: [
                    '**',
                    '!**/*.json',
                    '!**/__test__/**',
                    '!**/?(*.)test.*',
                ],
                watch: development ? sourceFolder : null,
                silent: true,
                formatter: typescriptFormatter,
            }),
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            // new webpack.ProvidePlugin({
            //     _: [path.join(__dirname, `common/lib/lodash.js`), 'default'],
            // }),
            new webpack.NamedModulesPlugin(),
            development && new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.DefinePlugin({
                __CLIENT__: true,
                __SERVER__: false,
                __DEV__: development,
                __TEST__: false,
            }),
            development &&
                new BundleAnalyzerPlugin({
                    analyzerHost: '0.0.0.0',
                    analyzerPort: bundleAnalyserPort,
                    openAnalyzer: false,
                }),
            !development &&
                new CopyPlugin([
                    {
                        from: path.join(__dirname, 'public'),
                        to: publicFolder,
                    },
                ]),
            !development &&
                new HtmlWebpackPlugin({
                    template: './index.html',
                    filename: path.join(publicFolder, 'index.html'),
                    // chunks: ['index']
                }),
            !development && new HtmlWebpackInjector(),
        ].filter(x => !!x),
        devServer: {
            host: '0.0.0.0',
            port: hmrPort,
            historyApiFallback: true,
            hot: true,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': '*',
            },
            overlay: true,
        },
        output: {
            path: publicFolder,
            publicPath: development ? `http://localhost:${hmrPort}/` : '/',
            filename: development ? 'client.js' : '[name].[hash].js',
        },
    };
};
