import { call, put, takeLatest } from 'redux-saga/effects';

import { actions } from './slice';
import { AuthService } from 'lib/services/auth.service';

export function* getCurrentUser() {
  try {
    const sessionResponse = yield call([
      AuthService,
      AuthService.getCurrentUser,
    ]);
    yield put(actions.authenticated(sessionResponse.data));
  } catch (err) {
    yield put(actions.unauthenticated(null));
  }
}

export function* authSaga() {
  yield takeLatest(actions.getCurrentUser.type, getCurrentUser);
}
