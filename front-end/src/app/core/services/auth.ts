import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable,tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user/user.interface';
import { environment } from '../../../environments/environment';

export interface LoginRequest{
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface UserRegistrationRequest {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;

}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly tokenKey = 'jwt_token';
  private readonly userKey = 'current_user';

  currentUser = signal<AuthResponse | null>(this.getStoredUser());

  private getStoredUser(): AuthResponse | null {
    const userJson = localStorage.getItem(this.userKey);
    return userJson ? JSON.parse(userJson) : null;
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.authUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response));
        this.currentUser.set(response);
      })
    );
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

    register(request: UserRegistrationRequest): Observable<any> {
    return this.http.post<any>(`${environment.authUrl}/register`, request);
  }

}
