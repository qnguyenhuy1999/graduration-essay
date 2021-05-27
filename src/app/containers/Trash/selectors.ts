import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.trash || initialState;

export const selectTrash = createSelector(
  [selectDomain],
  trashState => trashState,
);
