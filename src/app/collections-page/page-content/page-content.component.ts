import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { CartHelper } from 'src/app/helper/cart.helper';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css'],
})
export class PageContentComponent implements OnChanges {
  @Input() productList: Array<Product> = [];
  @Input() dataRender: Array<Product> = [];
  @Input() currentPage: { number: number } = { number: 1 };
  icon = Icon;

  constructor(
    private sanitizer: DomSanitizer,
    private cartHelper: CartHelper
  ) {}
  ngOnChanges(simpleChanges: SimpleChanges) {
    let start = simpleChanges['currentPage'].currentValue.number * 36 - 36;
    let temp = [...this.productList];
    this.dataRender = temp.splice(start, 36);
  }
  convertToSafeSrc(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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
  addToCart(id: number) {
    this.cartHelper.addTocart(1, id, (cart: any) => {
      let now = new Date();
      now.setMonth(now.getMonth() + 1);
      document.cookie = `cart = ${JSON.stringify(
        cart
      )}; expires=${now.toUTCString()}; path=/`;
    });
  }
}
