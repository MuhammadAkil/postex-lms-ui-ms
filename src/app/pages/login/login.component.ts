import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseDTO } from 'src/app/constant/interface/responseDTO.interface';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  passwordVisible = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private commonService: CommonService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      applicationTypeId: new FormControl(1)

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
  onSusbmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;

    this.authService.login(formValue).subscribe({
      next: (res) => {
        console.log('Login response:', res);

        if (res.dist?.jwtToken) {
          this.authService.saveUser(res.dist);
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

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.authService.login(this.loginForm.value).subscribe((d: ResponseDTO<any>) => {
        if (d.statusCode?.toString().startsWith("20")) {
          this.submitted = false;
          this.authService.saveUser(d.dist);
          this.router.navigate(['/app/']);

        }
      }, (err: any) => {
        this.submitted = false;
        if (err?.status?.toString() == "500") {
          this.commonService.errorMessage({ message: "Oops, it seems like there was an unexpected error. Please try again later or refresh the page", title: err?.status?.toString() || "Error", })
        } else {
          this.commonService.errorMessage({ message: err?.error?.statusMessage || err?.error?.status?.statusMessageDetail || err?.message, title: err?.status?.toString() || "Error", });
        }
      });
    } else {
      this.submitted = false;
    }

  }

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
}