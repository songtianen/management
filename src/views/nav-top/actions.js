import * as navTop from './actionTypes'

export const errMsg = data => ({
  type: navTop.ERROR_MSG,
  payload: data,

})
export const navTopSuccess = data => ({
  type: navTop.NAVTOP_SUCCESS,
  payload: data,
})

export const getNavLists = data => ({
  type: navTop.GETNAVTOP,
  payload: data,
})

export const getRequestParam = data => ({
  type: navTop.GETREQUESTPARAM,
  payload: data,
})
