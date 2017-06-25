var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const path = require('path');
const PATHS = {
  src: path.resolve(__dirname,'src'),
  dist: path.resolve(__dirname,'static')
};

module.exports = {
	entry: PATHS.src + '/main.js',
  output: {
        path: PATHS.dist,
        filename: '[name].[chunkhash].js',
	},
	module: {
		rules: [
			{ 
				test: /\.jsx?$/, 
				loader: 'babel-loader',
				exclude: /node_modules/
				
			},{
				test: /\.swp?$/,
				loader: 'ignore-loader'
			}
		]
	},
	plugins: [
    new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
        rootAssetPath: PATHS.src,
        ignorePaths: ['/stylesheets', '/javascript']
    })
  ]
};
