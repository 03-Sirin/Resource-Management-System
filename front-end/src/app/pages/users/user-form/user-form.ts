import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { UsersService } from '../../../core/services/user/user';

import { User } from '../../../core/models/user/user.interface';

import { UserCreateRequest } from '../../../core/models/user/user.create.interface';

import { UserUpdateRequest } from '../../../core/models/user/user.update.interface';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  userForm!: FormGroup;

  userId: number | null = null;

  isEditMode = false;
  isLoading = false;
  loadError = '';


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {

    this.userForm = this.fb.group({

      employeeCode: [
        '',
        Validators.required
      ],

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        ''
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      phone: [
        ''
      ],

      role: [
        '',
        Validators.required
      ],

      status: [
        'ACTIVE',
        Validators.required
      ]

    });


    const id = this.route.snapshot.paramMap.get('id');


    if (id) {
  const userId = Number(id);
  if (!Number.isSafeInteger(userId) || userId <= 0) {
    this.loadError = 'Invalid employee ID.';
    this.isEditMode = true;
    return;
  }

  this.userId = userId;
  this.isEditMode = true;
  this.isLoading = true;

  this.usersService.getUserById(this.userId).subscribe({
    next: (user) => {
      this.userForm.patchValue({
        employeeCode: user.employeeCode,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      });

      // Password is not required when editing a user
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Failed to load user:', error);
      this.loadError = error instanceof Error && error.message.includes('was not found')
        ? 'Employee not found.'
        : 'Could not load employee details. Please try again.';
      this.isLoading = false;
    }
  });
}

  }


  saveUser(): void {

  if (this.isLoading || this.loadError) {
    return;
  }

  if (this.userForm.invalid) {
    this.userForm.markAllAsTouched();
    return;
  }

  const formValue = this.userForm.value;

  if (this.isEditMode && this.userId !== null) {

    const userUpdateRequest: UserUpdateRequest = {
      employeeCode: formValue.employeeCode,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      phone: formValue.phone,
      role: formValue.role,
      status: formValue.status
    };

    this.usersService.updateUser(
      this.userId,
      userUpdateRequest
    ).subscribe({

      next: (response) => {
        console.log('User updated successfully:', response);
        this.router.navigate(['/users']);
      },

      error: (error) => {
        console.error('Failed to update user:', error);
      }

    });

  } else {

    const userCreateRequest: UserCreateRequest = {
      employeeCode: formValue.employeeCode,
      firstName: formValue.firstName,
      lastName: formValue.lastName,
      email: formValue.email,
      password: formValue.password,
      phone: formValue.phone,
      role: formValue.role
    };

    this.usersService.createUser(
      userCreateRequest
    ).subscribe({

      next: (response) => {
        console.log('User created successfully:', response);
        this.router.navigate(['/users']);
      },

      error: (error) => {
        console.error('Failed to create user:', error);
      }

    });

  }
}


  cancel(): void {

    this.router.navigate(['/users']);

  }

}