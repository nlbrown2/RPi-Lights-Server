var ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const path = require('path');
const PATHS = {
  src: path.resolve(__dirname,'src'),
  dist: path.resolve(__dirname,'static')
};

module.exports = {
  entry: {
    main: './src/jsx/main.jsx',
    signedIn: './src/jsx/APIButton.jsx'
  },
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
        test: /^.+\.sw[px]$/,
				loader: 'ignore-loader'
      }
    ]
	},
	plugins: [
    new ManifestRevisionPlugin(path.join('build', 'manifest.json'), {
				rootAssetPath: PATHS.src,
        ignorePaths: ['/jsx', '/services']
    })
  ]
};
