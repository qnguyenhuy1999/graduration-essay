import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import { ContainerState } from './types';
import {
  CreateElement,
  Element,
  RemoveElement,
  RemoveElementResponse,
  ResponseNewElement,
} from 'types/element';

// The initial state of the Editor container
export const initialState: ContainerState = {
  loading: false,
  listElements: [],
  listLines: [],
  createElementResult: null,
  removeElementResult: null,
  error: null,
};

const removeLinesWhenRemoveElement = (listElements, listLines, elementId) => {
  const cloneListElements = [...listElements];
  const cloneListLines = [...listLines];

  const element = cloneListElements.find(
    element => element.elementId === elementId,
  );

  element.nodes.forEach(node => {
    cloneListLines.forEach((link, index) => {
      link.linkId === node.linkId && listLines.splice(index, 1);
    });
  });

  return cloneListLines;
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    getListElements(state, action: PayloadAction<{ slideId: string }>) {
      state.loading = true;
    },
    getListElementsSuccess(state, action: PayloadAction<Element[]>) {
      state.loading = false;
      state.listElements = action.payload;
    },
    getListLines(state) {
      state.listLines = JSON.parse(<string>localStorage.getItem('links')) || [];
    },
    createElement(state, action: PayloadAction<CreateElement>) {},
    createElementSuccess(state, action: PayloadAction<ResponseNewElement>) {
      state.createElementResult = action.payload;
    },
    removeElement(state, action: PayloadAction<RemoveElement>) {},
    removeElementSuccess(state, action: PayloadAction<RemoveElementResponse>) {
      const { message, elementId } = action.payload;

      const listLines = removeLinesWhenRemoveElement(
        state.listElements,
        state.listLines,
        elementId,
      );
      state.listLines = listLines;
      localStorage.setItem('links', JSON.stringify(listLines));

      state.removeElementResult = message;
    },

    getError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    resetStateResult(state) {
      state.error = initialState.error;
      state.createElementResult = initialState.createElementResult;
      state.removeElementResult = initialState.removeElementResult;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = editorSlice;
