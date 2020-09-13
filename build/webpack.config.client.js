const path=require('path')
const webpack=require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')

module.exports={
  mode:'development',
  entry:{
    app:path.join(__dirname,'../client/app.js')
  },
  output:{
    filename:'[name].[hash].js',
    path:path.join(__dirname,"../dist"),
    publicPath:'/public'
  },
  devServer:{
    open:true,
    port:8088,
    hot:true,
    contentBase:'../dist',
  },
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
  },
  plugins:[
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // template:path.join(__dirname,'../client/index.html')
      template:path.join(__dirname,'../client/template.html')
    })
  ]
}