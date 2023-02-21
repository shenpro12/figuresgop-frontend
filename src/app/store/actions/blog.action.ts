import { createAction, props } from '@ngrx/store';

export const initBlogs = createAction(
  '@blogs/init',
  props<{ blogs: Array<any> }>()
);
