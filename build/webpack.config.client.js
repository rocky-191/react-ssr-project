const path=require('path')
const webpack=require('webpack')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')

const isDev=process.env.NODE_ENV === 'development'

let config={
  entry:{
    app:path.join(__dirname,'../client/app.js')
  },
  output:{
    filename:'[name].[hash].js',
    path:path.join(__dirname,"../dist"),
    publicPath:'/public'
  },
  module:{
    rules:[
      {
        enforce:'pre',
        test:/\.jsx?$/,
        loader:'eslint-loader',
        exclude:/(node_modules)/
      },
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

if(isDev){
  config.devServer={
    // host:'0.0.0.0'
    open:true,
    port:8088,
    hot:true,
    contentBase:path.join(__dirname,"../dist"),
    overlay:{
      errors:true
    },
    publicPath:'/public',
    historyApiFallback:{
      index:'/public/index.html'
    }
  }
}

module.exports=config;