import { post, get } from './http' //eslint-disable-line
import { checksessionStorage, Encrypt, Decrypt, userStatus } from '../utils/util' //eslint-disable-line

export const register = (data) => {
  // const JSONstr = JSON.stringify(data)
  const regUserInfo = Encrypt(data)
  return new Promise((resolve, reject) => {
    post('/user/register', {}, {
      regUserInfo,
    }).then((resp) => {
      const resUserInfo = resp.data
      // const DecryptResData = resUserInfo ? JSON.parse(Decrypt(resUserInfo)) : resp
      const DecryptResData = resUserInfo ? Decrypt(resUserInfo) : resp
      checksessionStorage('TOKEN', resUserInfo)
      userStatus('set', { _key: 'USERNAME', val: DecryptResData.username })
      userStatus('set', { _key: 'USERTYPE', val: DecryptResData.type })
      resolve({ DecryptResData, resUserInfo })
    }).catch(reject)
  })
}

export const logout = (data) => {
  return new Promise((resolve, reject) => {
    post('/user/logout', {}, data).then((resp) => {
      resolve(resp)
    }).catch(reject)
  })
}
export const login = (data) => {
  // const JSONstr = JSON.stringify(data)
  const userInfo = Encrypt(data)
  return new Promise((resolve, reject) => {
    post('/user/login', {}, {
      userInfo,
    }).then((resp) => {
      const resUserInfo = resp.data
      // const DecryptResData = resUserInfo ? JSON.parse(Decrypt(resUserInfo)) : resp
      const DecryptResData = resUserInfo ? Decrypt(resUserInfo) : resp
      checksessionStorage('TOKEN', resUserInfo)
      userStatus('set', { _key: 'USERNAME', val: DecryptResData.username })
      userStatus('set', { _key: 'USERTYPE', val: DecryptResData.type })
      resolve({ DecryptResData, resUserInfo })
    }).catch(reject)
  })
}

export const getNavTop = (data) => {
  return new Promise((resolve, reject) => {
    get('/manage/toplists', data).then((resp) => {
      resolve(resp)
    }).catch(reject)
  })
}

export const fetchNavSideLists = (data) => {
  return new Promise((resolve, reject) => {
    get('/manage/navside', data).then((resp) => {
      resolve(resp)
    }).catch(reject)
  })
}

