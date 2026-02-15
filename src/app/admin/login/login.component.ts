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
  showSuccess = false;
  loading = false;
  showPassword = false;
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
// With Jwt token
  login() {
  if (this.loginForm.valid) {
     // 🔥 CLEAR OLD LOGIN STATE
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminLoggedIn');

    this.loading = true;

   this.http
  .post<any>('https://school-web-backend-5yye.onrender.com/api/admin/login', this.loginForm.value)
  .subscribe({
    next: (res) => {
      localStorage.setItem('adminToken', res.token); // ✅ JWT save
      localStorage.setItem('adminLoggedIn', 'true');
      this.showSuccess = true;
      this.loading = false;
    },
    error: () => {
      this.loading = false;
      alert('Invalid username or password');
    },
  });
  }
}

goToDashboard(){
  this.showSuccess = false;
  this.routes.navigate(['/admin/enquiries']);
}

togglePassword() {
  this.showPassword = !this.showPassword;
 
}
}
