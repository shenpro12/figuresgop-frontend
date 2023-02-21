import { Component, Input, OnChanges } from '@angular/core';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { CartHelper } from 'src/app/helper/cart.helper';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnChanges {
  @Input() dataRender: Product = new Product();
  icon = Icon;
  totalProduct: number = 1;
  constructor(private cartHelper: CartHelper) {}
  ngOnChanges(): void {
    this.totalProduct = 1;
  }
  getPriceWithDiscount(price: number, discount: number) {
    let temp = (100 - discount) / 100;
    return price * temp;
  }
  verifyInput(e: any) {
    let temp = Number.parseInt(e.target.value);
    if (temp && temp > 0) {
      this.totalProduct = temp;
    } else {
      this.totalProduct = 1;
    }
  }
  increaseTotalProduct() {
    this.totalProduct = Number.parseInt(this.totalProduct.toString()) + 1;
  }
  decreaseTotalProduct() {
    if (Number.parseInt(this.totalProduct.toString()) - 1 > 0) {
      this.totalProduct = Number.parseInt(this.totalProduct.toString()) - 1;
    }
  }
  addToCart() {
    this.cartHelper.addTocart(
      this.totalProduct,
      this.dataRender.ID,
      (cart: any) => {
        let now = new Date();
        now.setMonth(now.getMonth() + 1);
        document.cookie = `cart = ${JSON.stringify(
          cart
        )}; expires=${now.toUTCString()}; path=/`;
      }
    );
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
