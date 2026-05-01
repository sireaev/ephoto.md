import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, take, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { LoginTokenEnum } from '../enums/auth.enum';
import { ILogin, ILoginResponse } from '../interfaces/auth.interface';
import { Response } from '../interfaces/response.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  private refreshInProgress = false;
  private refreshSubject = new BehaviorSubject<string | null>(null);

  private API = '/api/auth';

  get accessToken(): string | null {
    return localStorage.getItem(LoginTokenEnum.ACCESS_TOKEN);
  }

  get refreshToken(): string | null {
    return localStorage.getItem(LoginTokenEnum.REFRESH_TOKEN);
  }

  setTokens(access: string, refresh: string) {
    localStorage.setItem(LoginTokenEnum.ACCESS_TOKEN, access);
    localStorage.setItem(LoginTokenEnum.REFRESH_TOKEN, refresh);
  }

  // ✅ NEW: decode token
  decodeToken(token: string | null): any | null {
    if (!token) return null;

    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }

  // ✅ NEW: get current user payload
  get user() {
    return this.decodeToken(this.accessToken);
  }

  // ✅ NEW: check expiration
  isTokenExpired(token: string | null): boolean {
    const decoded: any = this.decodeToken(token);
    if (!decoded?.exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return decoded.exp < now;
  }

  login(data: ILogin) {
    this.refreshInProgress = true;

    return this.http.post<Response<ILoginResponse>>(`${this.API}/login`, data)
      .pipe(
        tap((res: Response<ILoginResponse>) => {
          this.setTokens(res.data.accessToken, res.data.refreshToken);
          this.refreshInProgress = false;
          this.refreshSubject.next(res.data.accessToken);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  refresh() {
    if (this.refreshInProgress) {
      return this.refreshSubject.pipe(
        filter(token => token !== null),
        take(1)
      );
    }

    this.refreshInProgress = true;
    this.refreshSubject.next(null);

    return this.http.post<any>(`${this.API}/refresh`, {
      refreshToken: this.refreshToken,
    }).pipe(
      tap(res => {
        this.setTokens(res.accessToken, res.refreshToken);
        this.refreshInProgress = false;
        this.refreshSubject.next(res.accessToken);
      })
    );
  }
}
