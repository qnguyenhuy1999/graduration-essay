import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Login container
export const initialState: ContainerState = {
  loading: false,
  error: null,
  loginResult: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    doLogin(state, action: PayloadAction<any>) {},
    doLoginSuccess(state, action: PayloadAction<any>) {
      state.loginResult = action.payload;
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

export const { actions, reducer, name: sliceKey } = loginSlice;
