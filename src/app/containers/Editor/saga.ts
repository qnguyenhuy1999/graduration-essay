import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SlideService } from 'lib/services/slide.service';
import { ElementService } from 'lib/services/element.service';

export function* getListElements(action) {
  try {
    const { slideId } = action.payload;
    const sessionResponse = yield call(
      [SlideService, SlideService.getSlide],
      slideId,
    );
    const { data } = sessionResponse;
    yield put(actions.getListElementsSuccess(data.responseObject.elements));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* createElement(action) {
  try {
    const { elementId, nodeId, slideId } = action.payload;
    const sessionResponse = yield call(
      [ElementService, ElementService.createElement],
      elementId,
      nodeId,
    );
    const { data } = sessionResponse;
    yield put(actions.createElementSuccess(data.responseObject));
    yield put(actions.getListElements({ slideId }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* removeElement(action) {
  try {
    const { elementId, slideId } = action.payload;
    const sessionResponse = yield call(
      [ElementService, ElementService.removeElement],
      elementId,
    );
    const { message } = sessionResponse;
    yield put(actions.removeElementSuccess({ message, elementId }));
    yield put(actions.getListElements({ slideId }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* resetSlide(action) {
  try {
    const { slideId } = action.payload;
    const sessionResponse = yield call(
      [SlideService, SlideService.resetSlide],
      slideId,
    );
    yield put(actions.resetSlideSuccess(sessionResponse));
    yield put(actions.getListElements({ slideId }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* editorSaga() {
  yield takeLatest(actions.getListElements.type, getListElements);
  yield takeLatest(actions.createElement.type, createElement);
  yield takeLatest(actions.removeElement.type, removeElement);
  yield takeLatest(actions.resetSlide.type, resetSlide);
}
