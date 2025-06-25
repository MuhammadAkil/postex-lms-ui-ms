import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

//  onSubmit(): void {
//   this.submitted = true;

//   if (this.loginForm.invalid) return;

//   const formValue = this.loginForm.value;

//   this.authService.login(formValue).subscribe({
//     next: (res) => {
//       console.log('Login API response:', res);

//       if (res?.statusCode?.toString().startsWith('20')) {
//         // ✅ Store user data (only merchantId or userId if needed)
//         // const userData = {
//         //   appToken: res.data?.appToken || 'dummy-token',
//         //   userId: res.data?.userId || 0,
//         //   merchantId: res.data?.merchantId || 0,
//         //   email: res.data?.email,
//         // };
//         // this.authService.saveUser(userData, true);
//         this.authService.saveUser({
//   appToken: 'dummy-token-123456',
//   userId: 1,
//   email: formValue.email,
//   password:formValue.password,
//   merchantId: 999
// }, true);
// this.router.navigate(['/app/dashboard']);



//         this.router.navigate(['/app/dashboard']);
//       } else {
//         console.error('Login failed:');
//       }
//     },
//     error: (err) => {
//       console.error('Login error:', err);
//     }
//   });
// }
onSubmit(): void {
  this.submitted = true;

  if (this.loginForm.invalid) return;

  const formValue = this.loginForm.value;

  this.authService.login(formValue).subscribe({
    next: (res) => {
      console.log('Login response:', res);

      if (res.dist?.appToken) {
        this.authService.saveUser(res.dist, false);
        this.router.navigate(['/app/dashboard']);
      } else {
        console.error('Invalid login data');
      }
    },
    error: (err) => {
      console.error('Login error:', err);
    }
  });
}


  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}