import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  getOrder(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/account/order', {
      withCredentials: true,
    });
  }
  getProductByOrderId(orderId: number): Observable<any> {
    return this.http.post<any>(
      'http://localhost:3001/api/account/order/product',
      { orderId },
      {
        withCredentials: true,
      }
    );
  }
}
