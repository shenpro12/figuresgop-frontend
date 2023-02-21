import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from './services/product.service';
import { addProduct } from './store/actions/product.action';
import { initCart } from './store/actions/cart.action';
import { CookieService } from 'ngx-cookie-service';
import { AccountService } from './services/account.service';
import { login } from './store/actions/login.action';
import { BlogService } from './services/blog.service';
import { initBlogs } from './store/actions/blog.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'figure-shop';
  loading: { initLogin: boolean; initProduct: boolean; initBlogs: boolean } = {
    initLogin: true,
    initProduct: true,
    initBlogs: true,
  };
  constructor(
    private store: Store<any>,
    private productServices: ProductService,
    private cookieService: CookieService,
    private accoutService: AccountService,
    private blogsService: BlogService
  ) {}
  ngOnInit(): void {
    //init login data
    this.accoutService.verifyLoginStatus().subscribe((res) => {
      if (res.status) {
        this.store.dispatch(
          login({ status: res.status, userProfile: res.userProfile })
        );
      }
      this.loading.initLogin = false;
    });
    //init product data
    this.productServices.getProducts().subscribe((res) => {
      if (res.status == false) {
      } else {
        this.store.dispatch(
          addProduct({
            product: res,
          })
        );
      }
      this.loading.initProduct = false;
    });
    //init blogs data
    this.blogsService.getBlogs().subscribe((res) => {
      if (res.status) {
        this.store.dispatch(
          initBlogs({
            blogs: [...res.data],
          })
        );
      }
      this.loading.initBlogs = false;
    });
    //init cart data
    let cartCookies = this.cookieService.get('cart');
    if (cartCookies) {
      this.store.dispatch(initCart({ cart: JSON.parse(cartCookies) }));
    } else {
      this.store.dispatch(initCart({ cart: [] }));
    }
  }
}
