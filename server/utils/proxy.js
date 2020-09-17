const axios = require('axios')
const queryString = require('query-string')
const baseUrl = 'http://cnodejs.org/api/v1'

module.exports = function (req, res, next) {
  const path = req.path
  const user = req.session.user || {}
  const isRequireAuth = req.query.needAccessToken

  if (isRequireAuth && !user.accessToken) {
    res.status(401).send({
      success: false,
      msg: 'not login'
    })
  }
  const query = Object.assign({}, req.query, {
    accesstoken: (isRequireAuth && req.method === 'GET') ? user.accessToken : ''
  })
  if (query.needAccessToken) delete query.needAccessToken
  axios(`${baseUrl}${path}`, {
    method: req.method,
    params: query,
    data: queryString.stringify(Object.assign({}, req.body, {
      accesstoken: (isRequireAuth && req.method === 'POST') ? user.accessToken : ''
    })),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((resp) => {
    if (resp.status === 200) {
      res.send(resp.data)
    } else {
      res.status(resp.status).send(resp.data)
    }
  }).catch((err) => {
    if (err.response) {
      res.status(500).send(err.response.data)
    } else {
      res.status(500).send({
        success: false,
        msg: '未知错误'
      })
    }
  })
}
