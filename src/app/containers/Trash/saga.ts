import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SlideService } from 'lib/services/slide.service';

export function* getSlideInTrash() {
  try {
    const sessionResponse = yield call([
      SlideService,
      SlideService.getSlidesInTrash,
    ]);
    const { data } = sessionResponse;
    yield put(actions.getSlideInTrashSuccess(data.responseObject.data));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* reOpenSlide(action) {
  const id = action.payload;
  try {
    yield call([SlideService, SlideService.reOpenSlide], id);
    yield put(actions.reOpenSlideSuccess(id));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* trashSaga() {
  yield takeLatest(actions.getSlideInTrash.type, getSlideInTrash);
  yield takeLatest(actions.reOpenSlide.type, reOpenSlide);
}
