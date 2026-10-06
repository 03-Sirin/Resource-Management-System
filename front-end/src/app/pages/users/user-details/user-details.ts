import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../core/models/user.interface';
import { UsersService } from '../../../core/services/user';
@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  user: User | undefined;

  constructor(private route: ActivatedRoute, private router: Router,
    private usersService: UsersService) {
    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.user = this.usersService.getUserById(id);
  }

  goBack() {
    this.router.navigate(['/users']);
  }

}
