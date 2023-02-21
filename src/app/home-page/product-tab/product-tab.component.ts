import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ProductHelper } from 'src/app/helper/product.helper';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { AppState } from 'src/app/store/appState';
import { selectProduct } from '../../../app/store/selectors/product.selector';

interface inputOption {
  imageUrl: string;
  query: string;
  imagePosition: string;
  title: string;
  subText: string;
}

@Component({
  selector: 'product-tab',
  templateUrl: './product-tab.component.html',
  styleUrls: ['./product-tab.component.css'],
})
export class ProductTabComponent implements OnChanges, OnInit {
  @Input() option: inputOption = {
    imageUrl: '',
    query: '',
    imagePosition: '',
    title: '',
    subText: '',
  };
  productList: Array<Product> = [];
  containerClass = '';
  productContainerClass = '';
  loadingClass = false;
  constructor(
    private store: Store<AppState>,
    private productServices: ProductService,
    private productHelper: ProductHelper
  ) {}
  ngOnInit(): void {
    if (this.option.imagePosition == 'right') {
      this.containerClass = 'layout_right';
    }
    if (this.option.imagePosition == 'top') {
      this.containerClass = 'layout_top width_full';
      this.productContainerClass = 'productContent_top';
    }
    if (window.innerWidth < 992) {
      this.loadingClass = true;
    }
    this.store.pipe(select(selectProduct)).subscribe((res) => {
      this.getProduct(res);
    });
  }
  ngOnChanges(SimpleChanges: SimpleChanges): void {}
  getProduct(data: Array<Product>) {
    this.productServices
      .getProductByCategory(this.option.query)
      .subscribe((res) => {
        if (res.status == false) {
        } else {
          this.productList = [
            ...this.productHelper.getProductById(res, data, 12),
          ];
        }
      });
  }
}
