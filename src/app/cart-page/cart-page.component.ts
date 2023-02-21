import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { CartHelper } from '../helper/cart.helper';
import { ProductHelper } from '../helper/product.helper';
import { Product } from '../models/product.model';
import { CartService } from '../services/cart.service';
import { SiteLoadingShareService } from '../services/communicateWithSiteLoading.service';
import { logOut } from '../store/actions/login.action';
import { AppState } from '../store/appState';
import { selectLoginInfo } from '../store/selectors/account.selector';
import { selectCart } from '../store/selectors/cart.selector';
import { selectProduct } from '../store/selectors/product.selector';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  renderData: Array<Product | any> = [];
  productList: Array<Product> = [];
  cartData: any;
  productIdList: Array<{ product_id: number }> = [];
  loginInfo: any;
  constructor(
    private store: Store<AppState>,
    private productHelper: ProductHelper
  ) {}
  ngOnInit(): void {
    document.title = 'Giỏ hàng';
    this.store.pipe(select(selectCart)).subscribe((cart) => {
      this.renderData = [];
      this.cartData = cart;
      this.productIdList = cart.map((i) => {
        return { product_id: i.productId };
      });
      this.initData();
    });
    this.store.pipe(select(selectProduct)).subscribe((product) => {
      this.productList = product;
      this.initData();
    });
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      this.loginInfo = res;
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  initData() {
    if (this.productIdList.length && this.productList.length) {
      this.renderData = this.productHelper.getProductById(
        this.productIdList,
        this.productList
      );
    }
  }
  getTotalPrice() {
    let total = 0;
    this.cartData.map((item: any) => {
      this.productList.map((i) => {
        if (item.productId == i.ID) {
          total += i.price * ((100 - i.discount) / 100) * item.total;
        }
      });
    });
    return total;
  }
  getProduct(id: number): Product {
    return this.renderData.filter((i) => i.ID == id)[0];
  }
}
