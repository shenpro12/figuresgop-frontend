import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { CartHelper } from 'src/app/helper/cart.helper';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnChanges {
  @Input() cart: any;
  @Input() product: Product = new Product();
  totalProduct: number = 0;
  icon = Icon;
  constructor(
    private sanitizer: DomSanitizer,
    private cartHelper: CartHelper
  ) {}
  ngOnChanges(): void {
    this.totalProduct = this.cart.total;
  }
  convertToSafeSrc(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
  getURL(name: string, id: number) {
    return `/product/${name
      .replace(/[^\w]/gi, '-')
      .replace(/-*-/g, '-')
      .toLowerCase()}.${id}`;
  }
  getPriceWithDiscount(price: number, discount: number) {
    let temp = (100 - discount) / 100;
    return price * temp;
  }
  increaseTotalProduct() {
    this.totalProduct = Number.parseInt(this.totalProduct.toString()) + 1;
    this.updateCart(this.product.ID);
  }
  decreaseTotalProduct() {
    if (Number.parseInt(this.totalProduct.toString()) - 1 > 0) {
      this.totalProduct = Number.parseInt(this.totalProduct.toString()) - 1;
      this.updateCart(this.product.ID);
    }
  }
  verifyInput(e: any) {
    let temp = Number.parseInt(e.target.value);
    if (temp && temp > 0) {
      this.totalProduct = temp;
    } else {
      this.totalProduct = 1;
    }
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
  updateCart(id: number) {
    this.cartHelper.updateCart(this.totalProduct, id, (cart: any) => {
      let now = new Date();
      now.setMonth(now.getMonth() + 1);
      document.cookie = `cart = ${JSON.stringify(
        cart
      )}; expires=${now.toUTCString()}; path=/`;
    });
  }
}
