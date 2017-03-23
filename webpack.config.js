const path = require('path');

module.exports = {
  entry: './public/app/index.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'bundle.js'       
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'] 
  }
}
