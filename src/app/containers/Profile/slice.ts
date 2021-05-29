import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { ContainerState } from './types';
import { UpdatePasswordPayload, UpdateProfileFormValues } from 'types/profile';

// The initial state of the Profile container
export const initialState: ContainerState = {
  changePasswordResult: null,
  changeProfileResult: null,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    changePassword(state, action: PayloadAction<UpdatePasswordPayload>) {},
    changePasswordSuccess(state, action: PayloadAction<any>) {
      state.changePasswordResult = action.payload;
    },

    changeProfileInfo(state, action: PayloadAction<UpdateProfileFormValues>) {},
    changeProfileInfoSuccess(state, action: PayloadAction<any>) {
      state.changeProfileResult = action.payload;
    },

    getError(state, action: PayloadAction<any>) {
      state.error = action.payload;
    },
    resetStateResult(state) {
      state.error = initialState.error;
      state.changePasswordResult = initialState.changePasswordResult;
      state.changeProfileResult = initialState.changeProfileResult;
    },
    resetState() {
      return { ...initialState };
    },
  },
});

export const { actions, reducer, name: sliceKey } = profileSlice;
