var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './static/main.js',//值可以是字符串、 数组或对象
	output: {
	path: path.join(__dirname, './dist'),//Webpack结果存储
	publicPath: '/dist/',
	filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ["style-loader","css-loader"]
			},
			{
				test: /\.(eot|woff|woff2|ttf)([\\?]?.*)$/,
				use: [{
		          loader: 'url-loader',
		          options: {
		            limit: 10000
		          }
		        }]
			},
			{
				test: /\\.(png|jpg|gif|svg)$/,
				use: [{
					loader:'file-loader',
					query: {
						name: '[name].[ext]?[hash]'
					}
				}
				
				],
				
			}
		]
	},
	resolve: {
		alias: {
		'vue$': 'vue/dist/vue.js'
		}
	},
	
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
} 	
if(process.env.NODE_ENV === 'production') {
		module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
		module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
		])
} 