import { Component, OnInit } from '@angular/core';
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
import { UserCreateRequest } from '../../../core/models/user/user.create.interface';
import { UserUpdateRequest } from '../../../core/models/user/user.update.interface';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm implements OnInit {

  userForm!: FormGroup;

  userId: number | null = null;

  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {

    // Create the form
    this.userForm = this.fb.group({

      employeeCode: ['', Validators.required],

      firstName: ['', Validators.required],

      lastName: [''],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],

      phone: [''],

      role: ['', Validators.required],

      status: ['ACTIVE', Validators.required]
    });

    // Check whether this is Add or Edit
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.userId = Number(id);

      this.isEditMode = true;

      this.loadUser(this.userId);
    }
  }

  // Load existing user for Edit
  loadUser(id: number): void {

    this.usersService.getUserById(id).subscribe({

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

        // Password is not required while editing
        const passwordControl =
          this.userForm.get('password');

        passwordControl?.clearValidators();

        passwordControl?.updateValueAndValidity();
      },

      error: (error) => {

        console.error(
          'Failed to load user:',
          error
        );

        this.router.navigate(['/users']);
      }
    });
  }

  // Save user
  saveUser(): void {

    // Validate form
    if (this.userForm.invalid) {

      this.userForm.markAllAsTouched();

      return;
    }

    const formValue = this.userForm.value;

    // EDIT USER
    if (this.isEditMode) {

      const request: UserUpdateRequest = {

        employeeCode: formValue.employeeCode,

        firstName: formValue.firstName,

        lastName: formValue.lastName,

        email: formValue.email,

        phone: formValue.phone,

        role: formValue.role,

        status: formValue.status
      };

      this.usersService
        .updateUser(this.userId!, request)
        .subscribe({

          next: (updatedUser) => {

            console.log(
              'User updated successfully:',
              updatedUser
            );

            this.router.navigate(['/users']);
          },

          error: (error) => {

            console.error(
              'Failed to update user:',
              error
            );
          }
        });

    }

    // CREATE USER
    else {

      const request: UserCreateRequest = {

        employeeCode: formValue.employeeCode,

        firstName: formValue.firstName,

        lastName: formValue.lastName,

        email: formValue.email,

        password: formValue.password,

        phone: formValue.phone,

        role: formValue.role
      };

      this.usersService
        .createUser(request)
        .subscribe({

          next: (createdUser) => {

            console.log(
              'User created successfully:',
              createdUser
            );

            this.router.navigate(['/users']);
          },

          error: (error) => {

            console.error(
              'Failed to create user:',
              error
            );
          }
        });
    }
  }

  // Cancel
  cancel(): void {

    this.router.navigate(['/users']);
  }
}