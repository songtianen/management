import * as login from './actionTypes'

export const errMsg = msg => ({
  msg,
  type: login.ERROR_MSG,

})
export const loginSuccess = data => ({
  type: login.LOGIN_SUCCESS,
  payload: data,
})

export const doLogin = data => ({
  type: login.DOLOGIN,
  payload: data,
})
