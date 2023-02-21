import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../services/product.service';
import { AppState } from '../store/appState';
import { selectLoginInfo } from '../store/selectors/account.selector';
import { selectCart } from '../store/selectors/cart.selector';
import { logOut } from '../store/actions/login.action';

@Component({
  selector: 'app-checkouts-pages',
  templateUrl: './checkouts-pages.component.html',
  styleUrls: ['./checkouts-pages.component.css'],
})
export class CheckoutsPagesComponent implements OnInit, OnDestroy {
  stockProblems: boolean = true;
  stockProblemData: Array<any> = [];
  cartData: Array<any> = [];
  loading: boolean = true;
  icon = Icon;
  apiHandler: any;
  storeHandler: any;
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private productService: ProductService
  ) {}
  ngOnInit(): void {
    document.title = 'Kiểm tra kho...';
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      if (!res.status) {
        this.router.navigate(['account/login']);
      } else {
        this.checkStockHandle();
      }
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  ngOnDestroy(): void {
    if (this.apiHandler) {
      this.apiHandler.unsubscribe();
    }
    if (this.storeHandler) {
      this.storeHandler.unsubscribe();
    }
  }
  checkStockHandle() {
    this.storeHandler = this.store
      .pipe(select(selectCart))
      .subscribe((cart) => {
        this.cartData = cart;
        if (this.loading) {
          if (cart.length) {
            this.apiHandler = this.productService
              .checkStock(cart)
              .subscribe((res) => {
                if (res.status) {
                  this.stockProblems = false;
                } else if (!res.status && res.cartData) {
                  this.stockProblemData = res.cartData;
                } else {
                  this.store.dispatch(logOut());
                }
                this.loading = false;
              });
          } else {
            this.router.navigate(['cart']);
          }
        }
      });
  }
  updateCart(e: any) {
    this.stockProblems = e;
  }
  onStockError(e: any) {
    this.stockProblems = true;
    this.stockProblemData = e.cartData;
  }
}
