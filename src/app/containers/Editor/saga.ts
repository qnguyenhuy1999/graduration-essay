import { call, put, takeLatest } from 'redux-saga/effects';
import { actions } from './slice';
import { SlideService } from 'lib/services/slide.service';
import { ElementService } from 'lib/services/element.service';
import { LineService } from 'lib/services/line.service';

export function* getListElements(action) {
  try {
    const { slideId } = action.payload;
    const sessionResponse = yield call(
      [SlideService, SlideService.getSlide],
      slideId,
    );
    const { data } = sessionResponse;
    const { responseObject } = data;
    const { elements } = responseObject;
    const infoSlideDetail = {
      accessModifier: responseObject.accessModifier,
      id: responseObject.id,
      name: responseObject.name,
      status: responseObject.status,
      userId: responseObject.userId,
    };
    yield put(
      actions.getListElementsSuccess({
        listElements: elements,
        infoSlideDetail,
      }),
    );
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* createElement(action) {
  try {
    const { elementId, nodeId } = action.payload;
    const sessionResponse = yield call(
      [ElementService, ElementService.createElement],
      elementId,
      nodeId,
    );
    const { data } = sessionResponse;
    yield put(
      actions.createElementSuccess({
        ...data.responseObject,
        elementId,
        nodeId,
      }),
    );
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* removeElement(action) {
  try {
    const { elementId } = action.payload;
    const sessionResponse = yield call(
      [ElementService, ElementService.removeElement],
      elementId,
    );
    const { data } = sessionResponse;
    const { message } = data;
    yield put(actions.removeElementSuccess({ message, elementId }));
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
    const { data } = sessionResponse;
    const { message } = data;
    yield put(actions.resetSlideSuccess(message));
    yield put(actions.getListElements({ slideId }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* removeLine(action) {
  try {
    const { linkId } = action.payload;
    const sessionResponse = yield call(
      [LineService, LineService.removeLine],
      linkId,
    );
    const { data } = sessionResponse;
    const { message } = data;
    yield put(actions.removeLineSuccess({ message, linkId }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* updateElement(action) {
  const { type } = action.payload;
  const dataRequest = {
    caption: action.payload.caption,
    elementId: action.payload.elementId,
    html: action.payload.html,
    nodes: action.payload.nodes,
    position: action.payload.position,
    slideId: action.payload.slideId,
    status: action.payload.status,
  };

  try {
    const sessionResponse = yield call(
      [ElementService, ElementService.updateElement],
      dataRequest,
    );
    const { data } = sessionResponse;
    const { responseObject } = data;
    yield put(actions.updateElementSuccess({ ...responseObject, type }));
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* createLine(action) {
  try {
    const sessionResponse = yield call(
      [LineService, LineService.createLine],
      action.payload,
    );
    const { data } = sessionResponse;
    const { responseObject } = data;
    yield put(
      actions.createLineSuccess({ ...responseObject, ...action.payload }),
    );
  } catch (err) {
    yield put(actions.getError(err.data.message));
  }
}

export function* editorSaga() {
  yield takeLatest(actions.getListElements.type, getListElements);
  yield takeLatest(actions.createElement.type, createElement);
  yield takeLatest(actions.removeElement.type, removeElement);
  yield takeLatest(actions.resetSlide.type, resetSlide);
  yield takeLatest(actions.removeLine.type, removeLine);
  yield takeLatest(actions.updateElement.type, updateElement);
  yield takeLatest(actions.createLine.type, createLine);
}
