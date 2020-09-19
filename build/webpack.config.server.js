const path = require('path')
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
  }
  // devServer:{
  //   open:true,
  //   port:8088,
  //   hot:true,
  //   contentBase:'../dist',
  // },
})
