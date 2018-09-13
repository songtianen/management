import axios from 'axios'
//  import CircularJSON from 'circular-json'
import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse('0880076B18D7EE81') // 十六位十六进制数作为密钥
const _iv = CryptoJS.enc.Utf8.parse('CB3EC842D7C69578') // 十六位十六进制数作为密钥偏移量

// 解密方法
export function Decrypt(word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)
  let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: _iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return JSON.parse(decryptedStr.toString())
}
// 加密方法
export function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(JSON.stringify(word))
  let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: _iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
  return encrypted.ciphertext.toString().toUpperCase()
}

export function countDownone() {
  let num = parseInt(sessionStorage.getItem('count'), 10)
  if (num <= 0) num = 10
  let siv = setInterval(() => {
    num -= 1
    sessionStorage.setItem('count', num)
    let savednum = sessionStorage.getItem('count')
    if (savednum === '0') {
      clearInterval(siv)
    }
  }, 1000)
  return console.log(sessionStorage.getItem('count'))
}

export function userStatus(status, {_key, val}) {
  if (status === 'get') {
    const data = sessionStorage.getItem(_key)
    if (!data) {
      // window.location.reload(true)
      return data
    }// eslint-disable-line
    return data
  }
  if (status === 'set' && _key && val) {
    sessionStorage.setItem(_key, val)
    return null
  }
  if (status === 'remove' && _key) {
    sessionStorage.removeItem(_key)
    return null
  }
  if (status === 'clear') {
    sessionStorage.clear()
    return null
  }
  return ''
}
export function checksessionStorage(_key, data) {
  let name = sessionStorage.getItem(_key)
  if (name !== String(data)) {
    sessionStorage.setItem(_key, data)
  }
  axios.defaults.headers.common['Authorization'] = data
}
