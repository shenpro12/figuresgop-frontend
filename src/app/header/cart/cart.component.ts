import { Component, OnInit } from '@angular/core';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ProductHelper } from 'src/app/helper/product.helper';
import { CartHelper } from 'src/app/helper/cart.helper';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/appState';
import { selectCart } from 'src/app/store/selectors/cart.selector';
import { selectProduct } from 'src/app/store/selectors/product.selector';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  renderData: Array<Product | any> = [];
  productList: Array<Product> = [];
  cartData: any;
  productIdList: Array<{ product_id: number }> = [];
  icon = Icon;
  toggleLoginForm: boolean = false;
  totalRender: number = 0;
  constructor(
    private cartHelper: CartHelper,
    private store: Store<AppState>,
    private productHelper: ProductHelper,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.store.pipe(select(selectCart)).subscribe((cart) => {
      this.renderData = [];
      this.cartData = cart;
      this.productIdList = cart.map((i) => {
        return { product_id: i.productId };
      });
      this.initData();
      if (this.totalRender > 0) {
        let ele = document.getElementById('headerContainer');
        if (ele?.classList.contains('headerContainerScroll')) {
          ele?.classList.add('headerScroll');
          ele?.classList.remove('headerHide');
        }
        this.toggleCartHandle(true);
      }
      this.totalRender += 1;
    });
    this.store.pipe(select(selectProduct)).subscribe((product) => {
      this.productList = product;
      this.initData();
    });
  }
  initData() {
    if (this.productIdList.length && this.productList.length) {
      this.renderData = this.productHelper.getProductById(
        this.productIdList,
        this.productList
      );
    }
  }
  toggleCartHandle(bool?: boolean) {
    if (this.router.url != '/cart' && this.router.url != '/checkouts') {
      this.toggleLoginForm = bool ? bool : !this.toggleLoginForm;
      if (this.toggleLoginForm && window.innerWidth < 990) {
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
      } else {
        document.getElementsByTagName('body')[0].style.overflow = 'auto';
      }
    }
  }
  getTotalItem(id: number) {
    let total = 0;
    this.cartData.map((i: any) => {
      if (i.productId == id) {
        total = i.total;
      }
    });
    return total;
  }
  getPriceWithDiscount(price: number, discount: number) {
    let temp = (100 - discount) / 100;
    return price * temp;
  }
  getURL(name: string, id: number) {
    return `/product/${name
      .replace(/[^\w]/gi, '-')
      .replace(/-*-/g, '-')
      .toLowerCase()}.${id}`;
  }
  getTotalProduct() {
    return this.cartData.reduce(
      (accumulator: number, currentValue: any) =>
        accumulator + currentValue.total,
      0
    );
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
  deleteFromCart(id: number) {
    this.cartHelper.removeFromCart(id, (cart: any) => {
      let now = new Date();
      now.setMonth(now.getMonth() + 1);
      document.cookie = `cart = ${JSON.stringify(
        cart
      )}; expires=${now.toUTCString()}; path=/`;
    });
  }
  clearAllCartItem() {
    this.cartHelper.clearAllItem((cart: any) => {
      let now = new Date();
      now.setMonth(now.getMonth() + 1);
      document.cookie = `cart = ${JSON.stringify(
        cart
      )}; expires=${now.toUTCString()}; path=/`;
    });
  }
  convertToSafeSrc(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
