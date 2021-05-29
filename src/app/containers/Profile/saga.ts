import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { ProfileService } from 'lib/services/profile.service';

export function* changePassword(action) {
  const data = action.payload;
  try {
    const sessionResponse = yield call(
      [ProfileService, ProfileService.updatePassword],
      data,
    );
    yield put(actions.changePasswordSuccess(sessionResponse.data.message));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* changeProfileInfo(action) {
  const data = action.payload;
  try {
    const sessionResponse = yield call(
      [ProfileService, ProfileService.changeProfileInfo],
      data,
    );
    const { responseObject } = sessionResponse.data;
    yield put(actions.changeProfileInfoSuccess({ ...responseObject }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* profileSaga() {
  yield takeLatest(actions.changePassword.type, changePassword);
  yield takeLatest(actions.changeProfileInfo.type, changeProfileInfo);
}
