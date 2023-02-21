import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as Icon from '@fortawesome/free-solid-svg-icons';
import { OrderService } from 'src/app/services/order.service';
import { logOut } from 'src/app/store/actions/login.action';
import { AppState } from 'src/app/store/appState';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'order-histories',
  templateUrl: './order-histories.component.html',
  styleUrls: ['./order-histories.component.css'],
})
export class OrderHistoriesComponent implements OnInit, OnDestroy {
  productList: Array<Product> = [];
  orderData: Array<any> = [];
  renderData: Array<any> = [];
  loading: boolean = true;
  ordersApi: any;
  icon = Icon;
  //
  currentPage: number = 1;
  controlItem: Array<number> = [];
  totalItemPerView: number = 15;
  maxPage: number = 0;
  //
  toggleOrderDetail: boolean = false;
  orderDetail: any;
  orderProductLoading: boolean = true;
  orderProductData: Array<any> = [];
  orderProductApi: any;
  //
  sortObj: string = '';
  constructor(
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    document.title = 'Lịch sử đặt hàng';
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    this.ordersApi = this.orderService.getOrder().subscribe((res) => {
      //console.log(res);
      if (res.status) {
        this.orderData = [
          ...res.orders,
          ...res.orders,
          ...res.orders,
          ...res.orders,
        ];
        this.loading = false;
        this.initControlData();
      } else {
        this.store.dispatch(logOut());
      }
    });
  }
  ngOnDestroy(): void {
    if (this.ordersApi) {
      this.ordersApi.unsubscribe();
    }
  }
  getDate(ms: string): string {
    let time = new Date(parseInt(ms));
    return `${time.getDate()}/${time.getMonth() + 1}/${time.getFullYear()}`;
  }

  initControlData() {
    this.toggleOrderDetailHandler(false);
    this.maxPage = Math.ceil(this.orderData.length / this.totalItemPerView);
    let end = this.currentPage * this.totalItemPerView - 1;
    let start = end - (this.totalItemPerView - 1);
    this.renderData = this.orderData.slice(start, end + 1);
    this.controlItem = [];
    for (
      let i = this.currentPage - 2;
      i <= this.currentPage + 2 && i <= this.maxPage;
      i++
    ) {
      if (i > 0) {
        this.controlItem.push(i);
      }
    }
  }
  changePage(page: number) {
    this.currentPage = page;
    this.initControlData();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
  toggleOrderDetailHandler(bool: boolean, orderId?: number) {
    if (bool) {
      document
        .getElementById('contentContainer')
        ?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      document.title = `Đơn hàng của tôi (#${orderId})`;
    } else {
      document.title = 'Lịch sử đặt hàng';
    }
    if (!bool && this.orderProductApi) {
      this.orderProductApi.unsubscribe();
    }
    if (orderId) {
      this.orderDetail = this.renderData.find((i) => i.ID == orderId);
      this.orderProductLoading = true;
      this.orderProductData = [];
      this.orderProductApi = this.orderService
        .getProductByOrderId(this.orderDetail.ID)
        .subscribe((res) => {
          if (res.status) {
            this.orderProductData = res.productData;
            this.orderProductLoading = false;
          } else if (!res.status && res.type == 'login') {
            this.store.dispatch(logOut());
          }
        });
    }
    this.toggleOrderDetail = bool;
  }
  getURL(name: string, id: number) {
    return `/product/${name
      .replace(/[^\w]/gi, '-')
      .replace(/-*-/g, '-')
      .toLowerCase()}.${id}`;
  }
}
