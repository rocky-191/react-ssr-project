const express=require('express')
const path=require("path")
const ReactSSR=require('react-dom/server')
const fs=require("fs")
const app=express()


const isDev=process.env.NODE_ENV === 'development'

if(!isDev){
  const serverEntry=require('../dist/server-entry.js')
  const template=fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf-8")
  app.use('/public',express.static(path.join(__dirname,'../dist')))

  app.get('*',function(req,res){
    const appString=ReactSSR.renderToString(serverEntry.default)
    const afterTemplate=template.replace('<!-- app -->',appString)
    res.send(afterTemplate)
  })
}else{
  const devStatic=require('./utils/dev.static')
  devStatic(app)
}

app.listen(3000,function(){
  console.log('react server render is running')
})