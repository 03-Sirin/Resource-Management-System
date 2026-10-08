import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, signal } from '@angular/core';
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

  user = signal<User | null>(null);
  loading = signal(true);
  loadError = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.loading.set(false);
      this.loadError.set('User not found.');
      return;
    }

    this.usersService.getUserById(id).subscribe({

      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },

      error: (error) => {
        console.error(
          'Failed to load user:',
          error
        );

        this.loading.set(false);
        this.loadError.set(
          error instanceof HttpErrorResponse && error.status === 404
            ? 'User not found.'
            : 'Could not load user details. Please try again.'
        );
      }

    });
  }

  goBack(): void {
    this.router.navigate(['/users']);
  }
}