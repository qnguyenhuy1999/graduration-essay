import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from './slice';

const selectDomain = (state: RootState) => state.editor || initialState;

export const selectEditor = createSelector(
  [selectDomain],
  editorState => editorState,
);
