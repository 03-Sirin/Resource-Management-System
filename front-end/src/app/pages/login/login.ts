import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false;
  isLoading = false;
  errorMessage = '';
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberMe: [false]
  });

  login(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const formVal = this.loginForm.getRawValue();
    this.authService.login({
      email: formVal.email!.trim(),
      password: formVal.password!
    }).subscribe({
      next: () => {
        this.isLoading = false;
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        const destination = returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
          ? returnUrl
          : '/dashboard';
        void this.router.navigateByUrl(destination);
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Invalid email or password. Please try again.';
        } else {
          this.errorMessage = 'Unable to connect to the server. Please try again later.';
        }
      }
    });
  }
}
