
import * as r from './actionTypes'
import * as common from '../../redux/constants'

const initState = {
  msg: '',
  username: '',
  type: '',
}
export default function user(state = initState, action) { // eslint-disable-line
  switch (action.type) {
    case r.REGISTER_SUCCESS:
      return {
        ...state,
        redireactTo: '/',
        ...action.payload,
      }
    case common.ClEARSTATES:
      return Object.assign({}, action.payload)
      // return {
      //   ...state,
      //   ...action.payload,
      // }
    case r.ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
      }
    default: return state
  }
}

