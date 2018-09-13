import { takeEvery, call, put } from 'redux-saga/effects'
import { userStatus } from '../../../../utils/util'
import { errMsg, logoutSuccess } from './actions'
import * as logoutType from './actionTypes'
import { clearStates } from '../../../../redux/actions'
import { ClEARSTATES } from '../../../../redux/constants'
import { logout } from '../../../../api/store'


// worker saga
function* doLogout() {
  try {
    const resdata = yield call(logout, {})
    if (resdata.code === 1) {
      yield call(userStatus, 'remove', { _key: 'TOKEN' })
      yield call(userStatus, 'remove', { _key: 'USERNAME' })
      yield call(userStatus, 'remove', { _key: 'USERTYPE' })
      yield put(logoutSuccess({code: resdata.code, msg: resdata.msg}))
      yield put(clearStates({ viewType: ClEARSTATES, data: { code: 1 } }))
    } else {
      yield put(errMsg(resdata.msg))
    }
  } catch (e) {
    yield put(errMsg(e))
  }
}
// watch saga
export function* watchDoLogout() {
  yield takeEvery(logoutType.DOLOGOUT, doLogout)
}
