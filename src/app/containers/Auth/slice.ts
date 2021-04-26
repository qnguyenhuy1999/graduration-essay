import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';

// The initial state of the Auth container
export const initialState: ContainerState = {
  loading: false,
  isAuthLoaded: false,
  authInfo: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getCurrentUser(state) {
      state.loading = true;
      state.isAuthLoaded = false;
      state.error = null;
    },
    authenticated(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuthLoaded = true;
      state.authInfo = action.payload;
    },
    unauthenticated(state, action: PayloadAction<any>) {
      state.loading = false;
      state.isAuthLoaded = true;
    },
    doLogout(state) {
      state.loading = false;
      state.isAuthLoaded = true;
      state.error = null;
      state.authInfo = null;
    },
    setCurrentUser(state, action: PayloadAction<any>) {
      const data = action.payload;

      state.authInfo = {
        ...state.authInfo,
        ...data,
      };
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

export const { actions, reducer, name: sliceKey } = authSlice;
