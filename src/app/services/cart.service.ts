import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}
  checkStock(
    cart: Array<{ total: number; productId: number }>
  ): Observable<any> {
    return this.http.post(
      'http://localhost:3001/api/cart/checkouts',
      {
        cart,
      },
      { withCredentials: true }
    );
  }
  order(orderInfo: any): Observable<any> {
    return this.http.post(
      'http://localhost:3001/api/order',
      {
        orderInfo,
      },
      { withCredentials: true }
    );
  }
  checkDiscountCode(discountCode: string): Observable<any> {
    return this.http.post('http://localhost:3001/api/discount/code/verify', {
      discountCode,
    });
  }
}
