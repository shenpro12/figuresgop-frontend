import { createSelector } from '@ngrx/store';
import { AppState } from '../appState';

export const selectBlogs = createSelector(
  (state: AppState) => state,
  (items: AppState) => items.app.blogs.items
);
