import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user/user.interface';
import { environment } from '../../../environments/environment';

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
  private readonly demoSessionKey = 'resource-management-demo-session';

  isAuthenticated(): boolean {
    return localStorage.getItem(this.demoSessionKey) === 'active';
  }

  startDemoSession(): void {
    localStorage.setItem(this.demoSessionKey, 'active');
  }

  endDemoSession(): void {
    localStorage.removeItem(this.demoSessionKey);
  }

  register(request: UserRegistrationRequest): Observable<User> {
    return this.http.post<User>(`${environment.authUrl}/register`, request);
  }
}
