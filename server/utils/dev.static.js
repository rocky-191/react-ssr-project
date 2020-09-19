const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const { createProxyMiddleware } = require('http-proxy-middleware')
const MemoryFs = require('memory-fs')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8088/public/index.html')
      .then((res) => {
        resolve(res.data)
      }).catch((err) => {
        reject(err)
      })
  })
}

// const Module = module.constructor

const NativeModules = require('module')
const vm = require('vm')

const getModuleFromString = (bundle, filename) => {
  const m = { exports: {} }
  const wrapper = NativeModules.wrap(bundle)
  const script = new vm.Script(wrapper, {
    filename: filename,
    displayErrors: true
  })

  const result = script.runInThisContext()
  result.call(m.exports, m.exports, require, m)
  return m
}

const mfs = new MemoryFs()
// webpack 编译配置
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
// webpack 监听文件变化
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(err => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )
  const bundle = mfs.readFileSync(bundlePath, 'utf-8')
  const m = getModuleFromString(bundle, 'server-entry.js')
  // m.compile(bundle, 'server-entry.js')
  serverBundle = m.exports
})

module.exports = function (app) {
  app.use('/public', createProxyMiddleware({
    target: 'http://localhost:8088'
  }))
  app.get('*', function (req, res, next) {
    if (!serverBundle) {
      return res.send('waiting for compile,refresh later')
    }
    getTemplate().then(template => {
      return serverRender(serverBundle, template, req, res)
    }).catch(err =>
      next(err)
    )
  })
}
