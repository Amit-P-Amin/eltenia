var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
require('es6-promise').polyfill()

module.exports = {
	entry: [
		'./eltenia.jsx'
	],
	devtool: process.env.WEBPACK_DEVTOOL || 'source-map',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'bundle.js'
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: loaders
	},
	devServer: {
		contentBase: "./public",
			noInfo: true, //  --no-info option
			hot: true,
			inline: true
		},
	plugins: [
		new webpack.ProvidePlugin({
			_: "lodash",
			"React"    : "react",
			"Router"   : "react-router",
			"uuid"     : "node-uuid",
			"Bootstrap": "react-bootstrap",
			"CryptoJS" : "crypto-js",
			"Radium"   : "radium",
			"Col"      : 'react-bootstrap/lib/Col'
 		})
	]
};
