import { createReducer, on } from '@ngrx/store';
import { initBlogs } from '../actions/blog.action';

export interface BlogState {
  items: Array<any>;
}
const initialState: BlogState = { items: [] };

export const blogsReducer = createReducer(
  initialState,
  on(initBlogs, (state, { blogs }) => {
    return { items: [...blogs] };
  })
);
