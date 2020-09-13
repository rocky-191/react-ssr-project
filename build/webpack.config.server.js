const path=require('path')
const webpack=require('webpack')

module.exports={
  target:'node',
  entry:{
    app:path.join(__dirname,'../client/server-entry.js')
  },
  output:{
    filename:'server-entry.js',
    path:path.join(__dirname,"../dist"),
    publicPath:'/public',
    libraryTarget:'commonjs2'
  },
  // devServer:{
  //   open:true,
  //   port:8088,
  //   hot:true,
  //   contentBase:'../dist',
  // },
  module:{
    rules:[
      {
        test:/\.jsx?$/,
        exclude:/(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/react']
          }
        }
      }
    ]
  }
}