import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ProductHelper } from '../helper/product.helper';
import { Product } from '../models/product.model';
import { AppState } from '../store/appState';
import { selectProduct } from '../store/selectors/product.selector';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css'],
})
export class SearchPageComponent implements OnInit {
  currentParam: string | null = '';
  dataRender: Array<Product> = [];
  productList: Array<Product> = [];
  currentPage = { number: 1 };
  input: string = '';
  icon = Icon;
  constructor(
    private route: ActivatedRoute,
    private productHelper: ProductHelper,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    this.route.paramMap.subscribe((params: ParamMap) => {
      let param = params.get('keyword');
      this.currentParam = param;
      document.title = `Tìm kiếm | ${param}`;
      this.initData();
    });
    this.store.pipe(select(selectProduct)).subscribe((products) => {
      this.productList = products;
      this.initData();
    });
  }
  initData() {
    if (this.currentParam && this.productList.length) {
      this.dataRender = this.productHelper.getProductByKeyWord(
        this.currentParam,
        this.productList
      );
    }
    this.currentPage = { number: 1 };
  }
  changePageNumber(e: number) {
    this.currentPage = { number: e };
  }
  searchHandler() {
    if (this.input) {
      this.router.navigate([`/search/${this.input}`]);
    }
  }
}
