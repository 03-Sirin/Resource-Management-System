import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../core/services/auth';

const matchingPasswords: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmation = control.get('confirmPassword')?.value;
  return password === confirmation ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly registerForm = this.fb.group(
    {
      employeeCode: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['',Validators.required,Validators.pattern(/^[0-9]{10}$/)],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: matchingPasswords },
  );

  showPassword = false;
  showConfirmation = false;
  isSubmitting = false;
  isRegistered = false;
  errorMessage = '';

  register(): void {
    if (this.registerForm.invalid || this.isSubmitting) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { confirmPassword: _confirmPassword, ...request } =
      this.registerForm.getRawValue();
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register({
      ...request,
      employeeCode: request.employeeCode ?? '',
      firstName: request.firstName ?? '',
      lastName: request.lastName ?? '',
      email: request.email ?? '',
      password: request.password ?? '',
      phone: request.phone ?? '',
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.isRegistered = true;
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.errorMessage = this.getErrorMessage(error);
      },
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      const apiMessage = error.error?.message ?? error.error?.detail;
      if (typeof apiMessage === 'string') {
        return apiMessage;
      }
      if (error.status === 0) {
        return 'Unable to reach the server. Please try again later.';
      }
    }

    return 'Registration failed. Please check your details and try again.';
  }
}
