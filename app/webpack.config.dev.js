const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    'bootstrap-loader',
    './client/index.js',
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  devtool: 'cheap-module-eval-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&sourceMap&localIdentName=[name]__[local]__[hash:base64:5]',
          'resolve-url',
          'sass?outputStyle=expanded&sourceMap',
        ],
      },
      {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
        query: {
          presets: ['react-hmre'],
        },
      },
    ],
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
      },
    }),
  ],
}
