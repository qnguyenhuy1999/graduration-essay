import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Register container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  registerResult: '',
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    doRegister(state, action: PayloadAction<any>) {},
    doRegisterSuccess(state, action: PayloadAction<any>) {
      state.registerResult = action.payload;
    },
    getError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    resetError(state) {
      state.error = initialState.error;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = registerSlice;
