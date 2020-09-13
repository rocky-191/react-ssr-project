const express=require('express')
const path=require("path")
const ReactSSR=require('react-dom/server')
const fs=require("fs")
const serverEntry=require('../dist/server-entry.js')
const app=express()

app.use('/public',express.static(path.join(__dirname,'../dist')))

const template=fs.readFileSync(path.join(__dirname,"../dist/index.html"),"utf-8")
app.get('*',function(req,res){
  const appString=ReactSSR.renderToString(serverEntry.default)
  const afterTemplate=template.replace('<app></app>',appString)
  res.send(afterTemplate)
})

app.listen(3000,function(){
  console.log('react server render is running')
})