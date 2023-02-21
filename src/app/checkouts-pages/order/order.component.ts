import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { ProductHelper } from 'src/app/helper/product.helper';
import { Product } from 'src/app/models/product.model';
import { AccountService } from 'src/app/services/account.service';
import { SiteLoadingShareService } from 'src/app/services/communicateWithSiteLoading.service';
import { logOut } from 'src/app/store/actions/login.action';
import { AppState } from 'src/app/store/appState';
import { selectLoginInfo } from 'src/app/store/selectors/account.selector';
import { selectProduct } from 'src/app/store/selectors/product.selector';
import { CartService } from 'src/app/services/cart.service';
import { CartHelper } from 'src/app/helper/cart.helper';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  @Input() cartData: any;
  @Output() onStockError = new EventEmitter();
  productList: Array<Product> = [];
  loginInfo: any;
  icon = Icon;
  //
  fullName: string = '';
  phone: string = '';
  location: string = '';
  province: string = '';
  district: string = '';
  ward: string = '';
  paymentMethod: string = '';
  shippingMethod: string = 'DELIVERY';
  totalPrice: number = 0;
  //
  discountCode: string = '';
  discountCodePrice: number = 0;
  //
  toggleOrder: boolean = false;
  //
  transportFee: number = 0;
  status: string = '';
  orderSuccess: boolean = false;
  discountCodeStatus: string = '';
  orderId: string = '';
  constructor(
    private store: Store<AppState>,
    private siteLoadingShareService: SiteLoadingShareService,
    private accountService: AccountService,
    private cartService: CartService,
    private productHelper: ProductHelper,
    private cartHelper: CartHelper
  ) {}
  ngOnInit(): void {
    document.title = 'Thanh toán đơn hàng';
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    this.store.pipe(select(selectLoginInfo)).subscribe((res) => {
      this.loginInfo = res.userProfile;
    });
    this.store.pipe(select(selectProduct)).subscribe((products) => {
      let temp = this.cartData.map((i: any) => {
        return { product_id: i.productId };
      });
      this.productList = this.productHelper.getProductById(temp, products);
      this.totalPriceViaProduct();
    });
  }
  logOut() {
    this.siteLoadingShareService.changeDisplay(true);
    this.accountService.logOut().subscribe((res) => {
      if (res.status) {
        this.store.dispatch(logOut());
      }
      this.siteLoadingShareService.changeDisplay(false);
    });
  }

  checkboxChange(e: any) {
    if (e.target.checked) {
      e.target.nextSibling.focus();
    }
    if (e.target.nextSibling.value) {
      e.target.checked = true;
    }
  }
  inputFocusOut(e: any) {
    if (!e.target.value) {
      e.target.previousSibling.checked = false;
    } else {
      e.target.previousSibling.checked = true;
    }
  }
  selectBoxChangeHandler(e: any) {
    if (e.province || e.district || e.district) {
      this.province = e.province;
      this.district = e.district;
      this.ward = e.ward;
      this.transportFee = e.price;
      this.totalPriceViaProduct();
      if (this.totalPrice + this.discountCodePrice >= 1000000) {
        this.transportFee = 0;
      }
      if (
        this.shippingMethod == 'DELIVERY' &&
        this.province &&
        this.district &&
        this.ward
      ) {
        this.totalPrice += this.transportFee;
      }
    }
  }
  shippingMethodChange(e: any) {
    this.shippingMethod = e.method;
    this.totalPriceViaProduct();
    this.totalPrice += e.transportFee;
  }
  totalPriceViaProduct() {
    this.totalPrice =
      this.productList.reduce((accumulator, currentValue) => {
        let total = this.cartData.find(
          (i: any) => currentValue.ID == i.productId
        ).total;
        let price = currentValue.price * ((100 - currentValue.discount) / 100);
        return accumulator + price * total;
      }, 0) - this.discountCodePrice;
  }
  getTotalPriceByCart() {
    return this.productList.reduce((accumulator, currentValue) => {
      let total = this.cartData.find(
        (i: any) => currentValue.ID == i.productId
      ).total;
      let price = currentValue.price * ((100 - currentValue.discount) / 100);
      return accumulator + price * total;
    }, 0);
  }
  getProductPrice(product: Product) {
    let total = this.cartData.find((i: any) => i.productId == product.ID).total;
    return product.price * ((100 - product.discount) / 100) * total;
  }
  getTotalProductViaCart(id: number) {
    return this.cartData.find((i: any) => i.productId == id).total;
  }
  submitOrderHandler() {
    if (
      this.fullName &&
      this.phone &&
      this.location &&
      this.province &&
      this.district &&
      this.ward &&
      this.shippingMethod &&
      this.paymentMethod
    ) {
      let orderInfo = {
        fullName: this.fullName,
        phone: this.phone,
        location: this.location,
        province: this.province,
        district: this.district,
        ward: this.ward,
        shippingMethod: this.shippingMethod,
        paymentMethod: this.paymentMethod,
        productDetail: this.cartData,
        discount: this.discountCode,
      };
      this.siteLoadingShareService.changeDisplay(true);
      this.cartService.order(orderInfo).subscribe((res) => {
        if (res.status) {
          //success request
          this.orderId = res.orderId;
          this.orderSuccess = true;
          this.cartHelper.clearAllItem((cart: any) => {
            let now = new Date();
            now.setMonth(now.getMonth() + 1);
            document.cookie = `cart = ${JSON.stringify(
              cart
            )}; expires=${now.toUTCString()}; path=/`;
          });
          document.title = 'Cảm ơn quý khách!';
        } else if (!res.status && res.cartData) {
          //err request
          //send message to checkout page
          this.onStockError.emit({
            status: res.status,
            cartData: res.cartData,
          });
        } else if (!res.status && res.type == 'login') {
          this.store.dispatch(logOut());
        } else {
          this.status = res.message;
        }
        this.siteLoadingShareService.changeDisplay(false);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      });
    } else {
      this.status = 'Vui lòng điền đầy đủ thông tin!';
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }
  submitDiscountCode(e: any) {
    if (this.discountCode && typeof this.discountCode == 'string') {
      if (this.discountCodePrice) {
        this.totalPrice += this.discountCodePrice;
      }
      this.discountCodePrice = 0;
      this.discountCodeStatus = '';
      let element = document.querySelectorAll('#discountCode_btn');
      element.forEach((i) => {
        i.classList.add('buttonEnable');
        i.textContent = 'Kiểm tra...';
      });

      this.cartService.checkDiscountCode(this.discountCode).subscribe((res) => {
        element.forEach((i) => {
          i.classList.remove('buttonEnable');
          i.textContent = 'Sử dụng';
        });
        if (res.status) {
          this.discountCodePrice = res.discount;
          this.totalPrice -= this.discountCodePrice;
        } else {
          this.discountCodeStatus = res.message;
        }
      });
    }
  }
}
