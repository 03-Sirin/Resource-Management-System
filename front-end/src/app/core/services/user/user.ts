import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { User } from '../../models/user/user.interface';
import { UserCreateRequest } from '../../models/user/user.create.interface';
import { UserUpdateRequest } from '../../models/user/user.update.interface';
import { UserStatusUpdateRequest } from '../../models/user/user.status.update.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private readonly apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}


  // GET /api/users
  getUsers(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);

  }


  // GET /api/users/{id}
  getUserById(id: number): Observable<User> {
    return this.getUsers().pipe(
      map(users => {
        const user = users.find(item => Number(item.id) === id);
        if (!user) {
          throw new Error(`Employee ${id} was not found.`);
        }
        return user;
      })
    );

  }


  // POST /api/users
  createUser(
    request: UserCreateRequest
  ): Observable<User> {

    return this.http.post<User>(
     `${this.apiUrl}`,
      request
    );

  }


  // PUT /api/users/{id}
  updateUser(
    id: number,
    request: UserUpdateRequest
  ): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${id}`,
      request
    );

  }


  // PATCH /api/users/{id}/status
  updateUserStatus(
    id: number,
    request: UserStatusUpdateRequest
  ): Observable<User> {

    return this.http.patch<User>(
      `${this.apiUrl}/${id}/status`,
      request
    );

  }

}