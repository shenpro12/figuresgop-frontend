import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}
  login(userName: string, password: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3001/api/account/login`,
      {
        userName: userName,
        password: password,
      },
      { withCredentials: true }
    );
  }
  logOut(): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/api/account/logout`, {
      withCredentials: true,
    });
  }
  verifyLoginStatus(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3001/api/account/verifyLoginStatus`,
      {
        withCredentials: true,
      }
    );
  }
  sigin(
    name: string,
    email: string,
    phone: string,
    location: string,
    password: string
  ): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3001/api/account/sigin`,
      {
        userName: email,
        name,
        password,
        location,
        phone,
      },
      { withCredentials: true }
    );
  }
  resetPassword(userName: string): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3001/api/account/resetpassword`,
      { userName },
      {
        withCredentials: true,
      }
    );
  }
  updateProfile(profile: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:3001/api/account/updateProfile`,
      { profile },
      {
        withCredentials: true,
      }
    );
  }
}
