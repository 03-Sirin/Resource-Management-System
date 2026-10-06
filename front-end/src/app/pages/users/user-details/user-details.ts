import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink
} from '@angular/router';

import { User } from '../../../core/models/user/user.interface';
import { UsersService } from '../../../core/services/user/user';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails implements OnInit {

  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.usersService.getUserById(id).subscribe({
      next: (user) => {
        this.user = user;
      },

      error: (error) => {
        console.error('Failed to load user:', error);
        this.user = undefined;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}