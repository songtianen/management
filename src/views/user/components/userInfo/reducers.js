
import * as login from './actionTypes'

const initState = {
  isLogin: false,
  msg: '',
}
export default function loginState(state = initState, action) { // eslint-disable-line
  switch (action.type) {
    case login.LOGIN_SUCCESS:
      return {
        ...state,
        isLogin: true,
        ...action.payload, // saga action
      }
    case login.ERROR_MSG:
      return {
        ...state,
        isLogin: false,
        msg: action.msg,
      }
    default: return state
  }
}
