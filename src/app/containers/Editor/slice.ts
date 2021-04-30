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
import { Line } from 'types/line';

// The initial state of the Editor container
export const initialState: ContainerState = {
  loading: false,
  listElements: [],
  listLines: [],
  createElementResult: null,
  removeElementResult: null,
  resetSlideResult: null,
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
    setListLines(state, action: PayloadAction<Line[]>) {
      state.listLines = action.payload;
    },
    createElement(state, action: PayloadAction<CreateElement>) {},
    createElementSuccess(state, action: PayloadAction<ResponseNewElement>) {
      const { newElement, elementId, nodeId, linked } = action.payload;
      
      const cloneListElements = [...state.listElements];
      const elementIndex = cloneListElements.findIndex(element => element.elementId === elementId);
      const nodeIndex = cloneListElements[elementIndex].nodes?.findIndex(node => node.id === nodeId);
      console.log(nodeIndex);
      
      cloneListElements[elementIndex] = {
        ...cloneListElements[elementIndex],
        nodes: [...cloneListElements[elementIndex]?.nodes.slice(0, nodeIndex), {...cloneListElements[elementIndex]?.nodes[nodeIndex], linkId:linked }, ...cloneListElements[elementIndex]?.nodes.slice(nodeIndex + 1)]
      }

      state.createElementResult = action.payload;
      state.listElements = [...cloneListElements, newElement];
    },
    removeElement(state, action: PayloadAction<RemoveElement>) {},
    removeElementSuccess(state, action: PayloadAction<RemoveElementResponse>) {
      const { message, elementId } = action.payload;
      const elementIndex  = state.listElements.findIndex(element => element.elementId === elementId);

      state.listLines = removeLinesWhenRemoveElement(
        state.listElements,
        state.listLines,
        elementId,
      );

      state.listElements.splice(elementIndex, 1);

      state.removeElementResult = message;
    },

    resetSlide(state, action: PayloadAction<{ slideId: string }>) {},
    resetSlideSuccess(state, action: PayloadAction<any>) {
      state.resetSlideResult = action.payload;
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
