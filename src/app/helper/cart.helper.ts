import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  addToCart,
  clearAll,
  removeFromCart,
  updateCart,
} from '../store/actions/cart.action';
import { AppState } from '../store/appState';
import { selectCart } from '../store/selectors/cart.selector';
@Injectable()
export class CartHelper {
  cartState: Array<{ total: number; productId: number }> | undefined;
  constructor(private store: Store<AppState>) {
    this.store.pipe(select(selectCart)).subscribe((res) => {
      this.cartState = res;
    });
  }
  addTocart(total: number, productId: number, callBack: any) {
    this.store.dispatch(addToCart({ total: total, productId: productId }));
    if (this.cartState) {
      callBack(this.cartState);
    }
  }
  removeFromCart(id: number, callBack: any) {
    this.store.dispatch(removeFromCart({ id }));
    if (this.cartState) {
      callBack(this.cartState);
    }
  }
  clearAllItem(callBack: any) {
    this.store.dispatch(clearAll());
    if (this.cartState) {
      callBack(this.cartState);
    }
  }
  updateCart(total: number, productId: number, callBack: any) {
    this.store.dispatch(updateCart({ total: total, productId: productId }));
    if (this.cartState) {
      callBack(this.cartState);
    }
  }
}
