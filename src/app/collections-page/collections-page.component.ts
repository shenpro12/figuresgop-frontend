import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ProductHelper } from '../helper/product.helper';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';
import { AppState } from '../store/appState';
import { selectProduct } from '../store/selectors/product.selector';

export interface Filter {
  manufactuter: Array<string>;
  price: Array<string>;
  scale: Array<string>;
  sort: Array<string>;
}
interface DataRender {
  title: string;
  banner: string;
  product: Array<Product>;
  filter: Filter;
}
@Component({
  selector: 'app-collections-page',
  templateUrl: './collections-page.component.html',
  styleUrls: ['./collections-page.component.css'],
})
export class CollectionsPageComponent implements OnInit {
  productList: Array<Product> = [];
  mainData: Array<Product> = [];
  categoryParams: string | null = '';
  dataRender: DataRender = {
    title: '',
    banner: '',
    product: [],
    filter: { manufactuter: [], price: [], scale: [], sort: [] },
  };
  currentPage = { number: 1 };
  constructor(
    private route: ActivatedRoute,
    private productHelper: ProductHelper,
    private store: Store<AppState>,
    private productServices: ProductService
  ) {}
  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.mainData = [];
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      this.categoryParams = params.get('category');

      //
      {
        if (this.categoryParams === 'order') {
          this.dataRender = {
            title: 'Hàng order / pre-order',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/2_d54e35ed0abb4d3b9455318fff9fbf27_b5vrvx.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'available') {
          this.dataRender = {
            title: 'Hàng có sẵn',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940883/1_d4ed55bcca75476088a0075f9e5948ed_jqjeuz.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'scale-figure') {
          this.dataRender = {
            title: 'Scale Figure',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/3_8f4fe2a5794e4bf999ee75a165e4b8de_gvhxlb.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'chibi-figure') {
          this.dataRender = {
            title: 'Nendoroid & Chibi Figure',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/4_5e0bca7ec7994b62ba3745d62ff271c0_xiafzw.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'pop-up-figure') {
          this.dataRender = {
            title: 'Pop Up Parade',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/benner_pop_up_33095aea20c745c8abb0005c9c01abf3_fhqdbc.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'action-figure') {
          this.dataRender = {
            title: 'Figma & Action Figure',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/5_8740b6d89e834056bb1a9f5157ad16b5_eesznj.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'r18') {
          this.dataRender = {
            title: 'R18',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940883/6_5e9d116b37e74277be90b34cfc0c559f_jzi1kt.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'other') {
          this.dataRender = {
            title: 'Các loại figure khác',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940884/8_d317670c3ec74e70b92f7ab64137d304_um6ab6.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        } else if (this.categoryParams === 'all') {
          this.dataRender = {
            title: 'Tất cả sản phẩm',
            banner:
              'https://res.cloudinary.com/drdnqwdzd/image/upload/v1676940885/collection_banner_owrpoy.webp',
            product: [],
            filter: { manufactuter: [], price: [], scale: [], sort: [] },
          };
        }
      }
      //
      document.title = `Bộ sưu tập | ${this.dataRender.title}`;
      this.initProductData();
    });
    this.store.pipe(select(selectProduct)).subscribe((data) => {
      this.productList = data;
      this.initProductData();
    });
  }
  initProductData(): void {
    if (this.productList.length && this.categoryParams) {
      if (this.categoryParams == 'all') {
        let temp = [...this.productList];
        this.mainData = temp.reverse();
        this.onFilter(this.dataRender.filter);

        return;
      }
      this.productServices
        .getProductByCategory(this.categoryParams)
        .subscribe((res) => {
          if (res.status == false) {
          } else {
            this.mainData = this.productHelper.getProductById(
              res,
              this.productList
            );
            this.onFilter(this.dataRender.filter);
          }
        });
    }
  }
  onFilter(filter: Filter): void {
    this.dataRender.filter = filter;
    //
    this.dataRender.product = this.productHelper.getProductByFilter(
      this.dataRender.filter,
      this.mainData
    );
    this.currentPage = { number: 1 };
  }
  changePageNumber(e: number) {
    this.currentPage = { number: e };
  }
}
