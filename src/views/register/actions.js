import * as r from './actionTypes'

export const errMsg = msg => ({
  msg,
  type: r.ERROR_MSG,

})
export const registerSuccess = data => ({
  type: r.REGISTER_SUCCESS,
  payload: data,
})

export const doRegister = data => ({
  type: r.DOREGISTER,
  payload: data,
})
