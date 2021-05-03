import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import { ContainerState } from './types';
import { CreateSlideFormValues, Slide } from 'types/slide';

// The initial state of the Home container
export const initialState: ContainerState = {
  loading: false,
  slides: [],
  createSlideResult: null,
  error: null,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    getSlides(state) {},
    getSlidesSuccess(state, action: PayloadAction<Slide[]>) {
      state.slides = action.payload;
    },

    createSlide(state, action: PayloadAction<CreateSlideFormValues>) {},
    createSlideSuccess(state, action: PayloadAction<Slide>) {
      const slide = action.payload;
      state.createSlideResult = slide;
      state.slides.push(slide);
    },

    getError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    resetStateResult(state) {
      state.error = initialState.error;
      state.createSlideResult = initialState.createSlideResult;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = homeSlice;
