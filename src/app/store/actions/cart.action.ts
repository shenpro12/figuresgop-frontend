import { createAction, props } from '@ngrx/store';

export const initCart = createAction(
  '@cart/init',
  props<{ cart: Array<{ total: number; productId: number }> }>()
);
export const addToCart = createAction(
  '@cart/add',
  props<{ total: number; productId: number }>()
);
export const removeFromCart = createAction(
  '@cart/remove',
  props<{ id: number }>()
);
export const clearAll = createAction('@cart/clear');
export const updateCart = createAction(
  '@cart/update',
  props<{ total: number; productId: number }>()
);
