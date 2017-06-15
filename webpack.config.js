const path = require('path');
const PATHS = {
  src: path.resolve(__dirname,'src'),
  dist: path.resolve(__dirname,'static')
};
module.exports = {
	entry: PATHS.src + '/main.js',
  output: {
        path: PATHS.dist,
        filename: 'bundle.js'
	},
	module: {
		rules: [
			{ 
				test: /\.jsx?$/, 
				loader: 'babel-loader',
				exclude: /node_modules/
				
			}
		]
	}
};
