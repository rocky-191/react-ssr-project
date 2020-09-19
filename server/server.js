const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const serverRender = require('./utils/server-render')
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
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))

  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(err => next(err))
  })
} else {
  const devStatic = require('./utils/dev.static')
  devStatic(app)
}

app.use(function (error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})

app.listen(3000, function () {
  console.log('react server render is running 3000')
})
