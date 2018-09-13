import { takeEvery, call, put } from 'redux-saga/effects'
import { errMsg, loginSuccess } from './actions'
import { login } from '../../api/store'
import { clearStates } from '../../redux/actions'
import { ClEARSTATES } from '../../redux/constants'
import * as loginType from './actionTypes'

// worker saga
function* doLogin(data) {
  try {
    const resData = yield call(login, {userInfo: data.payload})
    const DecryptResData = resData.DecryptResData
    if (DecryptResData.code === 0) {
      yield put(loginSuccess({ ...DecryptResData }))
      yield put(clearStates({ viewType: ClEARSTATES, data: { code: 0 } }))
    } else {
      yield put(errMsg(DecryptResData.msg))
    }
  } catch (e) {
    yield put(errMsg(e.message))
  }
}
// watch saga
export function* watchDoLogin() {
  yield takeEvery(loginType.DOLOGIN, doLogin)
}
