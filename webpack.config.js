const path = require('path');
const webpack = require('webpack');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

module.exports = {
	mode: 'development',
	entry: {
		neuroblock: './src/main.ts'
	},

	output: {
		// filename: '[name].[chunkhash].js',
		filename: '[name].pack.js',
		path: path.resolve(__dirname, 'public/js')
	},

	plugins: [ new webpack.ProgressPlugin() ],

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'all',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	module: {
		rules: [
			{
				test: /.(ts|tsx)?$/,
				loader: 'ts-loader',
				include: [path.resolve(__dirname, 'src')],
				exclude: [/node_modules/]
			}
		]
	},

	// devServer: {
	// 	open: true
	// },

	mode: "development",
	devtool: "source-map",
	resolve: {
		alias: {
			vue: 'vue/dist/vue.js'
		},
		extensions: ['.tsx', '.ts', '.js'],
	},
};
