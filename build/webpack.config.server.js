const path = require('path')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base.js')
const { merge } = require('webpack-merge')

module.exports = merge(baseConfig, {
  target: 'node',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  externals: Object.keys(require('../package.json').dependencies),
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/public',
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_BASE': '"http://127.0.0.1:3000"'
    })
  ]
})
