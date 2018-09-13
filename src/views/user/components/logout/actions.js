import * as logout from './actionTypes'

export const errMsg = msg => ({
  msg,
  type: logout.ERROR_MSG,

})
export const logoutSuccess = data => ({
  type: logout.LOGOUT_SUCCESS,
  payload: data,
})

export const dologout = data => ({
  type: logout.DOLOGOUT,
  payload: data,
})
