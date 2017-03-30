var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: './public_html/index.html',
  filename: 'index.html',
  inject: 'body'
});
module.exports = {
  entry: __dirname + '/app/index.js',
  module: {
     loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        {
          loader: 'image-webpack-loader',
          query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4
          }
        }
      }
    ]
  },
  output: {
   filename: 'transformed.js',
   path: __dirname + '/build'
  },
  plugins: [HTMLWebpackPluginConfig]
};
