
import * as logout from './actionTypes'
import * as common from '../../../../redux/constants'

const initState = {
  msg: '',
}
export default function logOutState(state = initState, action) { // eslint-disable-line

  switch (action.type) {
    case logout.LOGOUT_SUCCESS:
      return {
        ...state,
        ...action.payload, // saga action
      }
    case common.ClEARSTATES:
      return Object.assign({}, action.payload)
    case logout.ISFETCHING:
      return {
        ...state,
        ...action.payload,
      }
    case logout.ERROR_MSG:
      return {
        ...state,
        msg: action.msg,
      }
    default: return state
  }
}
