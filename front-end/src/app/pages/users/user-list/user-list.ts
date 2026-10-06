import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UsersService } from '../../../core/services/user/user';
import { User } from '../../../core/models/user/user.interface';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {

  searchText = '';

  selectedRole = '';

  users: User[] = [];

  constructor(
    private userService: UsersService
  ) {}


  ngOnInit(): void {

    this.loadUsers();

  }


  loadUsers(): void {

    this.userService.getUsers().subscribe({

      next: (users) => {
        console.log('Users from backend:', users);
        this.users = users;

      },

      error: (error) => {

        console.error(
          'Failed to load users:',
          error
        );

      }

    });

  }


  // get filteredUsers(): User[] {

  //   const search =
  //     this.searchText
  //       .toLowerCase()
  //       .trim();

  //   return this.users.filter(user => {

  //     const matchesSearch =
  //       user.employeeCode
  //         .toLowerCase()
  //         .includes(search) ||

  //       user.firstName
  //         .toLowerCase()
  //         .includes(search) ||

  //       user.lastName
  //         .toLowerCase()
  //         .includes(search) ||

  //       user.email
  //         .toLowerCase()
  //         .includes(search);


  //     const matchesRole =
  //       this.selectedRole === 'All' ||
  //       user.role === this.selectedRole;


  //     return matchesSearch && matchesRole;

  //   });

  // }

  get filteredUsers(): User[] {

  const search = this.searchText.toLowerCase().trim();

  const result = this.users.filter(user => {

    const matchesSearch =
      user.employeeCode.toLowerCase().includes(search) ||
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    const matchesRole =
      this.selectedRole === '' ||
      user.role === this.selectedRole;

    return matchesSearch && matchesRole;
  });

  console.log('Filtered users:', result);

  return result;
}

  toggleStatus(user: User): void {

    const newStatus =
      user.status === 'ACTIVE'
        ? 'INACTIVE'
        : 'ACTIVE';


    const request = {
      status: newStatus
    };


    this.userService
      .updateUserStatus(user.id, request)
      .subscribe({

        next: (updatedUser) => {

          user.status = updatedUser.status;

        },

        error: (error) => {

          console.error(
            'Failed to update user status:',
            error
          );

        }

      });

  }

}