import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { AuthService } from 'lib/services/auth.service';

export function* doRegister(action) {
  const { registerInfo } = action.payload;
  try {
    const sessionResponse = yield call(
      [AuthService, AuthService.register],
      registerInfo,
    );
    yield put(actions.doRegisterSuccess(sessionResponse.data.message));
  } catch (err) {
    yield put(actions.getError(err.message));
  }
}

export function* registerSaga() {
  yield takeLatest(actions.doRegister.type, doRegister);
}
