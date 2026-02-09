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
  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      setTimeout(() => {
    this.loading = false;
  }, 3000);
      this.http
        .post('http://localhost:3000/api/admin/login', this.loginForm.value)
        .subscribe({
          next: () => {
             this.loading = false;
            localStorage.setItem('adminLoggedIn', 'true');
           
            this.showSuccess = true;
           
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
