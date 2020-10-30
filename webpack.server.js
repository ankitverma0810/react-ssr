const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpackNodeExternals = require('webpack-node-externals');

const DIST_PATH = path.resolve(__dirname, 'build');
const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const config = {
	//Inform webpack that we're building a bundle for nodeJS rather than for the browser
	target: 'node',
	//tell webpack the root file of our server application
	entry: './src/index.js',
	//tell webpack where to put the output file that is generated
	output: {
		filename: '[name].js',
        chunkFilename: development ? '[name].js' : '[chunkhash:8].js',
		path: path.resolve(__dirname, DIST_PATH)
	},
	//tell webpack not to include 'node_modules' in the server build file 
	externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);