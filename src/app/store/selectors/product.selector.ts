import { createSelector } from '@ngrx/store';
import { AppState } from '../appState';

export const selectProduct = createSelector(
  (state: AppState) => state,
  (items: AppState) => items.app.product.items
);
