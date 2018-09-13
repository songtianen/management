import { all, fork } from 'redux-saga/effects'

import Register from '../views/register'
import Login from '../views/login'
import navTop from '../views/nav-top'
import navSide from '../views/nav-side'
import { Logout } from '../views/user'

export default function* rootSaga() {
  yield all([
    ...Object.values(Register.saga),
    ...Object.values(Login.saga),
    ...Object.values(navTop.saga),
    ...Object.values(navSide.saga),
    ...Object.values(Logout.saga),
  ].map(fork))
}
