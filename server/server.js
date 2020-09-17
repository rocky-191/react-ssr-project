const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const ReactSSR = require('react-dom/server')
const fs = require('fs')
// const emptyFavicon = require('http-server-request-handlers-empty-favicon')
const app = express()

// app.use(emptyFavicon)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use('/api/user', require('./utils/handle-login'))
app.use('/api', require('./utils/proxy'))

const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
  const serverEntry = require('../dist/server-entry.js')
  const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res) {
    const appString = ReactSSR.renderToString(serverEntry.default)
    const afterTemplate = template.replace('<!-- app -->', appString)
    res.send(afterTemplate)
  })
} else {
  const devStatic = require('./utils/dev.static')
  devStatic(app)
}

app.listen(3000, function () {
  console.log('react server render is running')
})
