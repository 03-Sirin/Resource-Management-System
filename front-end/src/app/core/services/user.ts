import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: User[] = [
    {
      id: 1,
      employeeCode: 'EMP001',
      firstName: 'Arun',
      lastName: 'Kumar',
      email: 'arun@company.com',
      phone: '9876543210',
      role: 'EMPLOYEE',
      status: 'ACTIVE'
    },
    {
      id: 2,
      employeeCode: 'EMP002',
      firstName: 'Priya',
      lastName: 'Sharma',
      email: 'priya@company.com',
      phone: '9876543211',
      role: 'PROJECT_LEAD',
      status: 'ACTIVE'
    },
    {
      id: 3,
      employeeCode: 'EMP003',
      firstName: 'Rahul',
      lastName: 'Raj',
      email: 'rahul@company.com',
      phone: '9876543212',
      role: 'EMPLOYEE',
      status: 'INACTIVE'
    }
  ];

  getUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  toggleUserStatus(id: number): void {

    const user = this.users.find(user => user.id === id);

    if (user) {
      user.status =
        user.status === 'ACTIVE'
          ? 'INACTIVE'
          : 'ACTIVE';
    }
  }
}