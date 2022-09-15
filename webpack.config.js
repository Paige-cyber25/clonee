const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const configurations = require("./appsettings.json").webpack;


var plugins = [
	new MiniCssExtractPlugin({
		filename: configurations.cache ? "css/[name].css" : "css/[name].[contenthash].css"
	}),

	new CleanWebpackPlugin(),
];

if (configurations?.embed == true) {
	plugins.push(new HtmlWebpackPlugin({
		template: path.resolve(__dirname, "src/index.html"),
		filename: "../public/index.html",
		inject: true,
	}));
}

module.exports = {
	mode: configurations.mode,
	entry: configurations.entry,
	output: {
		filename: configurations.output.filename,
		path: path.resolve(__dirname, configurations.output.path),
		publicPath: '/static/'
	},
	plugins,
	module: {
		rules: [
			{
				test: /\.(js|jsx)?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: false,
						cacheCompression: false,
						envName: "development",
					},
				},
			},
			{
				test: /\.html$/,
				use: ["html-loader"],
			},
			{
				test: /\.(css|scss)$/,
				use: [
					// MiniCssExtractPlugin.loader, 
					'style-loader',
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(jpg|png|gif|bmp)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 8192,
						name: "media/[name].[ext]",
					},
				},
			},
			{
				test: /\.(eot|otf|ttf|woff|woff2)$/,
				use: {
					loader: require.resolve("file-loader"),
					options: {
						limit: 8192,
						name: "media/[name].[ext]",
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".js", ".jsx", ".css", ".scss"],
	},
	externals: {
		// jquery: 'jQuery',
		React: "react",
	},
	stats: {
		children: true,
		// assets: false,
		moduleAssets: false,
		cachedModules: false,
	},
	// errorDetails: true
};
