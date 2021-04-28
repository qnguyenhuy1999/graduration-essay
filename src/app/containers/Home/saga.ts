import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SlideService } from 'lib/services/slide.service';

export function* getSlides() {
  try {
    const sessionResponse = yield call([SlideService, SlideService.getSlides]);
    const { data } = sessionResponse;
    yield put(actions.getSlidesSuccess(data.responseObject.data));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* homeSaga() {
  yield takeLatest(actions.getSlides.type, getSlides);
}
