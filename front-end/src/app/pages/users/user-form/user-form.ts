import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {

  userForm !:FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { 

  this.userForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    role: ['', Validators.required],
    project: [''],
    reportingManager: [''],
    status: ['Active', Validators.required]
  });
}

  saveUser() {

    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    console.log(this.userForm.value);

    // For now, just go back to users
    this.router.navigate(['/users']);
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}
