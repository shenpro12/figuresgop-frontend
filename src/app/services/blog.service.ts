import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}
  getPageContent(slug: string | null): Observable<any> {
    return this.http.get(`http://localhost:3001/api/pages/content/${slug}`);
  }
  getBlogs(): Observable<any> {
    return this.http.get(`http://localhost:3001/api/blogs`);
  }
  getBlogContent(id: string, type: string | null): Observable<any> {
    return this.http.get(`http://localhost:3001/api/blogs/${type}/${id}`);
  }
}
