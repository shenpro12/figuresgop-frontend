import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ProductHelper } from 'src/app/helper/product.helper';
import { Product } from 'src/app/models/product.model';
import { AppState } from 'src/app/store/appState';
import { selectProduct } from 'src/app/store/selectors/product.selector';
import { CartHelper } from 'src/app/helper/cart.helper';

@Component({
  selector: 'app-stock-problems',
  templateUrl: './stock-problems.component.html',
  styleUrls: ['./stock-problems.component.css'],
})
export class StockProblemsComponent implements OnInit {
  @Input() stockProblemData: Array<any> = [];
  @Input() cartData: Array<any> = [];
  @Output() onUpdateCart = new EventEmitter();
  renderData: Array<any> = [];
  displayedColumns: string[] = ['product', 'total', 'price', 'status'];
  icon = Icon;
  constructor(
    private productHelper: ProductHelper,
    private store: Store<AppState>,
    private cartHelper: CartHelper
  ) {}
  ngOnInit(): void {
    document.title = 'Vấn đề tồn kho - Figure Shop';
    this.store.pipe(select(selectProduct)).subscribe((res) => {
      this.initData(res);
    });
  }
  initData(productList: Array<Product>) {
    this.renderData = this.stockProblemData
      .filter((i) => i.exceeding) // remove all item not exceeding
      .map((i) => {
        let product = this.productHelper.getProductById(
          [{ product_id: i.productId }],
          productList
        )[0];
        let cart = this.cartData.find(
          (cartItem) => cartItem.productId == i.productId
        );
        return {
          product,
          total: cart.total,
          exceeding: i.exceeding,
          status: 'Vượt tồn kho',
          price: product.discount
            ? product.price * ((100 - product.discount) / 100) * cart.total
            : product.price * cart.total,
        };
      });
  }
  updateCartHandler() {
    this.renderData.map((i) => {
      this.cartHelper.updateCart(
        i.total - i.exceeding,
        i.product.ID,
        (cart: any) => {
          let now = new Date();
          now.setMonth(now.getMonth() + 1);
          document.cookie = `cart = ${JSON.stringify(
            cart
          )}; expires=${now.toUTCString()}; path=/`;
        }
      );
    });
    this.onUpdateCart.emit(false);
  }
}
