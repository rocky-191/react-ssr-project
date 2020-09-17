const path = require('path')
const baseConfig = require('./webpack.config.base.js')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template:path.join(__dirname,'../client/index.html')
      template: path.join(__dirname, '../client/template.html')
    })
  ]
})

if (isDev) {
  config.devServer = {
    // host:'0.0.0.0'
    open: true,
    port: 8088,
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    overlay: {
      errors: true
    },
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
}

module.exports = config
