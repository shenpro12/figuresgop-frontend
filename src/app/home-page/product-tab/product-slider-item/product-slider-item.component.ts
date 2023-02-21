import {
  Component,
  ViewEncapsulation,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { CartHelper } from 'src/app/helper/cart.helper';
import { Product } from 'src/app/models/product.model';
import SwiperCore, { Grid, Autoplay, Navigation } from 'swiper';
SwiperCore.use([Grid, Autoplay, Navigation]);
@Component({
  selector: 'product-slider-item',
  templateUrl: './product-slider-item.component.html',
  styleUrls: ['./product-slider-item.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ProductSliderItemComponent implements OnChanges, OnInit {
  @Input() imgPositon: string = '';
  @Input() productList: Array<Product> = [];

  gridCol = 3;
  icon = Icon;
  containerClass = '';
  constructor(
    private sanitizer: DomSanitizer,
    private cartHelper: CartHelper
  ) {}
  ngOnInit(): void {
    if (this.imgPositon == 'top') {
      this.containerClass = 'flex-row w-9';
    }
    if (this.imgPositon == 'top' && window.innerWidth > 992) {
      this.gridCol = 6;
    } else if (this.imgPositon == 'top' && window.innerWidth > 630) {
      this.gridCol = 4;
    } else if (this.imgPositon == 'top') {
      this.gridCol = 3;
    }
    window.onresize = () => {
      if (this.imgPositon == 'top' && window.innerWidth > 992) {
        this.gridCol = 6;
      } else if (this.imgPositon == 'top' && window.innerWidth > 630) {
        this.gridCol = 4;
      } else if (this.imgPositon == 'top') {
        this.gridCol = 3;
      }
    };
  }
  ngOnChanges(SimpleChanges: SimpleChanges): void {}
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
