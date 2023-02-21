import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  getProducts(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/api/product/figures/all');
  }
  getProductByCategory(category: string | null): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3001/api/product/figures/category/${category}`
    );
  }
  getRelatedProduct(id: number, count: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3001/api/product/category/${id}/${count}`
    );
  }
  getProductImage(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/api/product/image/${id}`);
  }
  checkStock(cart: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3001/api/cart/checkouts`,
      {
        cart,
      },
      { withCredentials: true }
    );
  }
}
