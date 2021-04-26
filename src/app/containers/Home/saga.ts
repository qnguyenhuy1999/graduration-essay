import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SlideService } from 'lib/services/slide.service';

export function* getSlides() {
  try {
    const sessionResponse = yield call([SlideService, SlideService.getSlides]);
    yield put(actions.getSlidesSuccess(sessionResponse.responseObject.data));
  } catch (err) {
    yield put(actions.getError(err.message));
  }
}

export function* homeSaga() {
  yield takeLatest(actions.getSlides.type, getSlides);
}
