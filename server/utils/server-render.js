const Helmet = require('react-helmet').default
const serialize = require('serialize-javascript')
const ejs = require('ejs')
const asyncBootrapper = require('react-async-bootstrapper')
const ReactDomServer = require('react-dom/server')

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson()
    return result
  }, {})
}

module.exports = (bundle, template, req, res) => {
  return new Promise((resolve, reject) => {
    const Createstoremap = bundle.Createstoremap
    const createApp = bundle.default
    const routerContext = {}
    const stores = Createstoremap()
    const app = createApp(stores, routerContext, req.url)

    asyncBootrapper(app).then((res) => {
      if (routerContext.url) {
        res.status(302).setHeader('Location', routerContext.url)
        res.end()
        return
      }
      const helmet = Helmet.rewind()
      const content = ReactDomServer.renderToString(app)
      const state = getStoreState(stores)

      const html = ejs.render(template, {
        appString: content,
        initialState: serialize(state),
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        style: helmet.style.toString(),
        link: helmet.link.toString()
      })

      // const content = ReactDomServer.renderToString(app) // 报错，暂时注释
      res.send(html)
      resolve()
    }).catch((err) => reject(err))
  })
}
