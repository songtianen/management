import axios from 'axios'
// webpack DEfindPLugin定义这个变量
// 服务端渲染 发送请求的时候，发送到本地的地址，地址是存在客户端与服务端的区别的

// axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('TOKEN')
// alert('local', sessionStorage.getItem('TOKEN')) // eslint-disable-line

const baseUrl = process.env.API_BASE || ''

// 处理url
const parseUrl = (url, params) => {
  params = params || {}
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`
    return result
  }, '')
  return `${baseUrl}/api${url}?${str.substr(0, str.length - 1)}`
}

export const get = (url, params) => {
  return new Promise((resolve, reject) => {
    axios.get(parseUrl(url, params)).then((resp) => {
      const data = resp.data
      if (resp.status === 200 && data) {
        resolve(data)
      } else {
        reject(data)
      }
    }).catch(reject)
  })
}

export const post = (url, params, content) => {
  return new Promise((resolve, reject) => { //eslint-disable-line
    axios.post(parseUrl(url, params), content).then((resp) => {
      // console.log('resprespresp', resp)
      const data = resp.data
      if (data && resp.status === 200) {
        resolve(data)
      }
    }).catch(reject)
  })
}
