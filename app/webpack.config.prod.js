const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: [
    'bootstrap-loader',
    './client/index.js',
  ],

  output: {
    path: `${__dirname}/static/dist/`,
    filename: 'bundle.js',
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?modules'),
      },
      {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
    ],
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin('app.css', { allChunks: true }),
  ],
}
