
import * as login from './actionTypes'
import * as common from '../../redux/constants'

const initState = {
  notificationCount: 0,
}
export default function loginState(state = initState, action) { // eslint-disable-line
  switch (action.type) {
    case login.LOGIN_SUCCESS:
      // console.log('8888**********', action.payload)
      return {
        ...state,
        ...action.payload, // saga action
      }
    case common.ClEARSTATES:
      return Object.assign({}, action.payload)

      // return {
      //   ...state,
      //   ...action.payload,
      // }
    case login.ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
      }
    default: return state
  }
}
