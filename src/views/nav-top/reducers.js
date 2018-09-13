
import * as navTop from './actionTypes'
import * as common from '../../redux/constants'

const initState = {
  syncing: true,
  requestfield: '',
  currentPage: '',
  username: '',
}
export default function navTopList(state = initState, action) { // eslint-disable-line
  switch (action.type) {
    case navTop.NAVTOP_SUCCESS:
      return {
        ...state,
        syncing: false,
        ...action.payload,
      }
    case common.ClEARSTATES:
      return {
        ...state,
        ...action.payload,
      }
    case navTop.ERROR_MSG:
      // console.log('--=-=-=-==--oooo', action.payload)
      return {
        ...state,
        isLogin: false,
        ...action.payload,
      }
    // case navTop.GETREQUESTPARAM:
    //   return {
    //     ...state,
    //     currentPage: tabs[action.payload],
    //     requestfield: action.payload,
    //   }
    default: return state
  }
}

