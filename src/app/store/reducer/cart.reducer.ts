import { createReducer, on } from '@ngrx/store';

import {
  initCart,
  addToCart,
  removeFromCart,
  clearAll,
  updateCart,
} from '../actions/cart.action';

export interface CartState {
  items: Array<{ total: number; productId: number }>;
}
const initialState: CartState = { items: [] };

export const cartReducer = createReducer(
  initialState,
  on(initCart, (state, { cart }) => {
    return { items: [...state.items, ...cart] };
  }),
  on(addToCart, (state, { total, productId }) => {
    let temp: any = state.items.filter((i) => i.productId == productId);
    if (temp.length) {
      temp = state.items.map((i) => {
        if (i.productId == productId) {
          return { total: temp[0].total + total, productId: temp[0].productId };
        } else {
          return i;
        }
      });
      return { items: [...temp] };
    } else {
      return { items: [...state.items, { total, productId }] };
    }
  }),
  on(removeFromCart, (state, { id }) => {
    return { items: state.items.filter((i) => i.productId != id) };
  }),
  on(clearAll, () => {
    return { items: [] };
  }),
  on(updateCart, (state, { total, productId }) => {
    let temp = state.items.map((i) => {
      if (i.productId == productId) {
        return { total, productId };
      }
      return i;
    });
    return { items: temp };
  })
);
