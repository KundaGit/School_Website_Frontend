import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private routes: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    if (this.loginForm.valid) {
      this.http
        .post('http://localhost:3000/api/admin/login', this.loginForm.value)
        .subscribe({
          next: () => {
            localStorage.setItem('adminLoggedIn', 'true');
            alert('Login Successful');
            this.routes.navigate(['/admin/enquiries']);
          },
          error: () => {
            alert('Invalid username or password');
          },
        });
    }
  }
}
