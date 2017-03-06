const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const pkg = require('./package.json')
const __DEV__ = process.env.NODE_ENV === 'development'

const webpackConfig = {
  entry: './src/index.js',
  output: {
    filename: `${pkg.name}.js`,
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}

if (__DEV__) {
  webpackConfig.devServer = {
    host: '0.0.0.0',
    port: 3000
  }
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      title: 'Dev',
      template: 'example/index.html',
      inject: 'head'
    })
  )
} else {
  webpackConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig
