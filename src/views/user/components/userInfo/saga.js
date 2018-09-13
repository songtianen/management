import { takeEvery, call, put } from 'redux-saga/effects'
import { post } from '../../../../api/http'
import { errMsg, loginSuccess } from './actions'
import * as login from './actionTypes'

// worker saga
function* doLogin(data) {
  const { userName, password } = data.payload
  // console.log('=========', data.payload)
  try {
    const resdata = yield call(post, '/user/login', {}, { username: userName, pwd: password })
    // console.log('--resdata--', resdata)
    if (resdata.code === 0) {
      yield put(loginSuccess({code: resdata.code, username: resdata.username}))
    } else {
      yield put(errMsg(resdata.msg))
    }
  } catch (e) {
    // yield put(errMsg(e.message))
    // console.log('eeeeeeeeee', e)
  }
}
// watch saga
export function* watchDoLogin() {
  yield takeEvery(login.DOLOGIN, doLogin)
}
