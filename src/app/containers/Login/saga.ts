import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { AuthService } from 'lib/services/auth.service';

export function* doLogin(action) {
  const { authInfo } = action.payload;
  try {
    const sessionResponse = yield call(
      [AuthService, AuthService.login],
      authInfo,
    );

    const { data } = sessionResponse;

    yield put(actions.doLoginSuccess(data.responseObject));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* loginSaga() {
  yield takeLatest(actions.doLogin.type, doLogin);
}
