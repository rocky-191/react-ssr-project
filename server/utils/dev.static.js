const axios=require('axios')
const path=require('path')
const webpack=require('webpack')
const {createProxyMiddleware}=require('http-proxy-middleware')
const MemoryFs=require('memory-fs')
const ReactDomServer=require('react-dom/server')

const serverConfig=require("../../build/webpack.config.server")

const getTemplate=()=>{
  return new Promise((resolve,reject)=>{
    axios.get('http://localhost:8088/public/index.html')
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      });
  })
}

const Module=module.constructor

const mfs=new MemoryFs
// webpack 编译配置
const serverCompiler=webpack(serverConfig)
serverCompiler.outputFileSystem=mfs
let serverBundle
// webpack 监听文件变化
serverCompiler.watch({},(err,stats)=>{
  if(err) throw err;
  stats=stats.toJson()
  stats.errors.forEach(err=>console.error(err))
  stats.warnings.forEach(err=>console.warn(err))

  const bundlePath=path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle=mfs.readFileSync(bundlePath,'utf-8')
  const m=new Module()
  m._compile(bundle,'server-entry.js')
  serverBundle=m.exports.default
})

module.exports=function(app){
  app.use('/public',createProxyMiddleware({
    target:'http://localhost:8088'
  }))
  app.get('*',function(req,res){
    getTemplate().then(template=>{
      const content=ReactDomServer.renderToString(serverBundle)
      res.send(template.replace('<!-- app -->',content))
    })
  })
}