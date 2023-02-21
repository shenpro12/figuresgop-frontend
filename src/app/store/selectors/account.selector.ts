import { createSelector } from '@ngrx/store';
import { AppState } from '../appState';

export const selectLoginInfo = createSelector(
  (state: AppState) => state,
  (items: AppState) => items.app.login
);
