import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, } from '@angular/router';
import { UsersService } from '../../../core/services/user';
import { User } from '../../../core/models/user.interface';


@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  userForm !:FormGroup;
  userId: number | null = null;
  isEditMode = false;
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route:ActivatedRoute,
    private usersService:UsersService
  ) { 

  this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    project: [''],
    reportingManager: [''],
    status: ['Active', Validators.required]
  });
  const id = this.route.snapshot.paramMap.get('id');

if (id) {
  this.userId = Number(id);
  this.isEditMode = true;

  const user: User | undefined =
        this.usersService.getUserById(this.userId);

  if (user) {
    this.userForm.patchValue(user);
  }
}
}

  saveUser() {

    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    const user: User = {
      id: this.userId ?? Date.now(),
      ...this.userForm.value
    };

    if (this.isEditMode) {

      console.log('Updating user:', user);

    } else {

      console.log('Creating user:', user);

    }

    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
