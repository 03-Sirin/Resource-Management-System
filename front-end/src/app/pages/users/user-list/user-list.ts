import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../../core/services/user';
import { User } from '../../../core/models/user.interface';
@Component({
  selector: 'app-user-list',
  imports: [FormsModule, RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  searchText = '';
  selectedRole = 'All';
  users: User[]=[];
  constructor(private userService: UsersService) {
    this.users = this.userService.getUsers();
  }


  get filteredUsers():User[] {
    return this.users.filter(user => {

      const matchesSearch =
        user.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(this.searchText.toLowerCase())||
        user.email.toLowerCase().includes(this.searchText.toLowerCase());

      const matchesRole =
        this.selectedRole === 'All' ||
        user.role === this.selectedRole;

      return matchesSearch && matchesRole;
    });
  }

  toggleStatus(id: number) {
  this.userService.toggleUserStatus(id);
}

}
