import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { Slide } from 'types/slide';

// The initial state of the Trash container
export const initialState: ContainerState = {
  loading: false,
  slides: [],
  reOpenSlideResult: null,
  error: null,
};

const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    getSlideInTrash(state) {},
    getSlideInTrashSuccess(state, action: PayloadAction<Slide[]>) {
      state.loading = false;
      state.slides = action.payload;
    },

    reOpenSlide(state, action: PayloadAction<string>) {},
    reOpenSlideSuccess(state, action: PayloadAction<string>) {
      const slideId = action.payload;
      const slideIndex = state.slides.findIndex(slide => slide.id === slideId);
      state.slides.splice(slideIndex, 1);
      state.reOpenSlideResult = slideId;
    },

    getError(state, action: PayloadAction<any>) {
      state.loading = false;
      state.error = action.payload;
    },
    resetStateResult(state) {
      state.error = initialState.error;
      state.reOpenSlideResult = initialState.reOpenSlideResult;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = trashSlice;
