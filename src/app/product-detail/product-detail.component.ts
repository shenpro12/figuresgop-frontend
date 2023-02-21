import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ProductHelper } from '../helper/product.helper';
import { Product } from '../models/product.model';
import { AppState } from '../store/appState';
import { selectProduct } from '../store/selectors/product.selector';
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  productID: string | undefined;
  productData: Array<Product> | undefined;
  dataRender: any;

  constructor(
    private route: ActivatedRoute,
    private productHelper: ProductHelper,
    private store: Store<AppState>,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.productID = params.get('name')?.split('.')[1];
      this.initData();
    });
    this.store.pipe(select(selectProduct)).subscribe((data) => {
      this.productData = data;
      this.initData();
    });
  }
  initData() {
    if (this.productData && this.productID) {
      let temp = this.productHelper.getProductById(
        [{ product_id: Number.parseInt(this.productID) }],
        this.productData
      );

      this.dataRender = temp[0];
      if (this.dataRender) {
        document.title = this.dataRender.name;
      } else {
        this.router.navigate(['/']);
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }

    //console.log(this.dataRender);
  }
}
