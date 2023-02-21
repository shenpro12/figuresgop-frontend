import { createReducer, createSelector, on } from '@ngrx/store';

import { Product } from 'src/app/models/product.model';
import { addProduct } from '../actions/product.action';

export interface ProductState {
  items: Product[];
}
const initialState: ProductState = { items: [] };

export const productReducer = createReducer(
  initialState,
  on(addProduct, (state, { product }) => {
    return { items: [...state.items, ...product] };
  })
);
