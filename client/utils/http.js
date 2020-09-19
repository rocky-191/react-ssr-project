import axios from 'axios'

const baseUrl = process.env.API_BASE || ''

const parseUrl = (url, params) => {
  const str = Object.keys(params).reduce((result, key) => {
    // eslint-disable-next-line no-param-reassign
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((resp) => {
      const { data } = resp
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch((err) => {
      reject(err)
    });
})

export const post = (url, params, reportData) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), reportData)
    .then((resp) => {
      const { data } = resp
      if (data && data.success === true) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch((err) => {
      reject(err)
    });
})
