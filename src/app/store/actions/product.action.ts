import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product.model';

export const getProduct = createAction('@product/get');
export const addProduct = createAction(
  '@product/add',
  props<{ product: Array<Product> }>()
);
