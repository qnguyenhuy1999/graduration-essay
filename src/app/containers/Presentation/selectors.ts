import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.presentation || initialState;

export const selectPresentation = createSelector(
  [selectDomain],
  presentationState => presentationState,
);
