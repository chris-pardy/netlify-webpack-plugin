const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NetlifyPlugin = require('../dist/plugin');

module.exports = {
  entry: path.resolve(__dirname,'./index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'raw-loader'
      },
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 8000
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new NetlifyPlugin({
      headers: [
        {
          'for': '/*',
          values: {
            'x-from': 'netlify-test'
          }
        }
      ],
      redirects: [
        {
          from: '/netlify/*',
          to: 'https://www.netlify.com/docs/:splat',
          force: true
        },
        {
          from: '/pass-through/*',
          to: 'https://www.netlify.com/docs/:splat',
          status: 200
        },
        {
          from: '/*',
          to: '/index.html',
          status: 200
        }
      ]
    })
  ]
}
