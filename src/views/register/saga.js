import { takeEvery, call, put } from 'redux-saga/effects'
import { register } from '../../api/store'
import { errMsg, registerSuccess } from './actions'
import { clearStates } from '../../redux/actions'
import { ClEARSTATES } from '../../redux/constants'
import * as r from './actionTypes'

// worker saga
function* dooRegister(data) {
  try {
    const resData = yield call(register, data.payload)
    const DecryptResData = resData.DecryptResData
    if (DecryptResData.code === 0) {
      yield put(clearStates({ viewType: ClEARSTATES, data: { code: 0 } }))
      yield put(registerSuccess({ ...DecryptResData }))
    } else {
      yield put(errMsg(DecryptResData.msg))
    }
  } catch (e) {
    yield put(errMsg(e.message))
  }
}
// watch saga
export function* watchDoRegister() {
  yield takeEvery(r.DOREGISTER, dooRegister)
}

