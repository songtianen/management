// 与 actions 对应，其中 index.js 中是 combineReducers() 后的结果
// 因此目录名使用单数形式
import { combineReducers } from 'redux'
import register from '../../views/register'
import login from '../../views/login'
import navTop from '../../views/nav-top'
import navSide from '../../views/nav-side'
import { Logout } from '../../views/user'


const rootReducer = combineReducers({
  [register.constants.NAME]: register.reducer,
  [login.constants.NAME]: login.reducer,
  [navTop.constants.NAME]: navTop.reducer,
  [navSide.constants.NAME]: navSide.reducer,
  [Logout.constants.NAME]: Logout.reducer,
})
export default rootReducer

