const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'public');
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const config = {
    target: "web",
    devtool: development ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
    //tell webpack the root file of our server application
    entry: './src/client/client.js',
    //tell webpack where to put the output file that is generated
    output: {
        filename: '[name].js',
        chunkFilename: development ? '[name].js' : '[chunkhash:8].js',
        path: path.resolve(__dirname, DIST_PATH)
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
            chunkFilename: "[name]-[chunkhash:8].css"
        }),
        new LoadablePlugin()
    ]
}

module.exports = merge(baseConfig, config);