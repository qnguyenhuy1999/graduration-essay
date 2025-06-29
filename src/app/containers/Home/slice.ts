import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';

import { ContainerState } from './types';
import { CreateSlideFormValues, Slide, UpdateSlidePayload } from 'types/slide';

// The initial state of the Home container
export const initialState: ContainerState = {
  loading: false,
  slides: [],
  createSlideResult: null,
  updateSlideResult: null,
  removeSlideResult: null,
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

    updateSlide(state, action: PayloadAction<UpdateSlidePayload>) {},
    updateSlideSuccess(
      state,
      action: PayloadAction<{ slideId: string; name: string }>,
    ) {
      const { slideId, name } = action.payload;
      const cloneSlides = [...state.slides];
      const slideIndex = cloneSlides.findIndex(slide => slide.id === slideId);
      cloneSlides[slideIndex] = { ...cloneSlides[slideIndex], name };
      state.slides = cloneSlides;
      state.updateSlideResult = action.payload;
    },

    removeSlide(state, action: PayloadAction<string>) {},
    removeSlideSuccess(state, action: PayloadAction<string>) {
      const slideId = action.payload;
      const slideIndex = state.slides.findIndex(slide => slide.id === slideId);
      state.slides.splice(slideIndex, 1);
      state.removeSlideResult = slideId;
    },

    getError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetStateResult(state) {
      state.error = initialState.error;
      state.createSlideResult = initialState.createSlideResult;
      state.updateSlideResult = initialState.updateSlideResult;
      state.removeSlideResult = initialState.removeSlideResult;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = homeSlice;
