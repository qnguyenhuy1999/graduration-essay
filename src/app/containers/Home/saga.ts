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

export function* createSlide(action) {
  const { name } = action.payload;

  try {
    const sessionResponse = yield call(
      [SlideService, SlideService.createSlide],
      name,
    );
    const { data } = sessionResponse;
    const { responseObject } = data;
    yield put(actions.createSlideSuccess(responseObject));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* removeSlide(action) {
  const id = action.payload;

  try {
    yield call([SlideService, SlideService.removeSlide], id);
    yield put(actions.removeSlideSuccess(id));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* updateSlide(action) {
  const { id, name } = action.payload;

  try {
    yield call([SlideService, SlideService.updateSlide], id, name);
    yield put(actions.updateSlideSuccess({ slideId: id, name }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* homeSaga() {
  yield takeLatest(actions.getSlides.type, getSlides);
  yield takeLatest(actions.createSlide.type, createSlide);
  yield takeLatest(actions.updateSlide.type, updateSlide);
  yield takeLatest(actions.removeSlide.type, removeSlide);
}
