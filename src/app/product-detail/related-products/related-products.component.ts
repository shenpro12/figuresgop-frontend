import {
  Component,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ProductHelper } from 'src/app/helper/product.helper';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store/appState';
import { selectProduct } from 'src/app/store/selectors/product.selector';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  SwiperOptions,
} from 'swiper';
import { CartHelper } from 'src/app/helper/cart.helper';

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class RelatedProductsComponent implements OnChanges {
  @Input() currentProduct: Product = new Product();
  productList: Array<Product> = [];
  renderData: Array<Product> = [];
  relatedProductID: Array<{ product_id: number }> = [];
  icon = Icon;
  constructor(
    private productService: ProductService,
    private productHelper: ProductHelper,
    private store: Store<AppState>,
    private sanitizer: DomSanitizer,
    private cartHelper: CartHelper
  ) {}
  config: SwiperOptions = {
    navigation: true,
    pagination: { clickable: true },
    autoplay: { delay: 5000, disableOnInteraction: false },
    slidesPerView: 2,
    spaceBetween: 10,
    breakpoints: {
      '600': {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      '992': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
      '1170': {
        slidesPerView: 5,
        spaceBetween: 50,
      },
    },
  };
  ngOnChanges(simplechanges: SimpleChanges): void {
    this.store.pipe(select(selectProduct)).subscribe((data) => {
      this.productList = data;
      this.initData();
    });
    if (simplechanges['currentProduct'].currentValue) {
      this.productService
        .getRelatedProduct(simplechanges['currentProduct'].currentValue.ID, 8)
        .subscribe((res) => {
          this.relatedProductID = res;
          this.initData();
        });
    }
  }
  initData() {
    if ((this.productList, this.relatedProductID)) {
      this.renderData = this.productHelper
        .getProductById(this.relatedProductID, this.productList)
        .reverse();
      //console.log(this.renderData);
    }
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
