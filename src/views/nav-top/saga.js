import { takeEvery, call, put } from 'redux-saga/effects'
import { errMsg, navTopSuccess } from './actions'
import { getNavTop } from '../../api/store'
import * as navTop from './actionTypes'
import { tabs } from '../../utils/variable-define'


// worker saga
function* getNavTopLists(data) {
  try {
    const resdata = yield call(getNavTop, {tab: data.payload})
    if (resdata.code === 0) {
      yield put(navTopSuccess({ ...resdata, requestfield: data.payload, currentPage: tabs[data.payload] }))
    } else {
      yield put(errMsg(resdata))
    }
  } catch (e) {
    yield put(errMsg(e))
    // console.log('eeeeeeeeee', e)
  }
}
// watch saga
export function* watchGetNavTopLists() {
  yield takeEvery(navTop.GETNAVTOP, getNavTopLists)
}
