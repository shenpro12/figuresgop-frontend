import { createSelector } from '@ngrx/store';
import { AppState } from '../appState';

export const selectCart = createSelector(
  (state: AppState) => state,
  (items: AppState) => items.app.cart.items
);
