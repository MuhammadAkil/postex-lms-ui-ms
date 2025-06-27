import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseDTO } from '../constant/interface/responseDTO.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly STORAGE_KEY = environment.storageKey;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string ;applicationTypeId:number}): Observable<ResponseDTO<any>> {
    return this.http.post('/user/login', credentials);
  }
// login(credentials: { email: string; password: string }) {
//   // Simulate a fake API response
//   const fakeResponse = {
//     message: 'Login successful',
//     dist: {
//       userId: 1,
//       email: credentials.email,
//       fullName: 'Test User',
//       appToken: 'dummy-token-123456',
//       userType: 'admin'
//     },
//     statusCode: '200',
//     statusMessage: 'OK'
//   };

//   // Return it as Observable
//   return of(fakeResponse);
// }

  logout(): void {
    const dist = this.getStoredUser();
    if (dist?.appToken && dist?.userId) {
      this.http.post('/user/logout', { appToken: dist.appToken, userId: dist.userId }).pipe(take(1)).subscribe(() => {
        this.clearStorage();
        this.router.navigate(['/auth']);
      });
    } else {
      this.clearStorage();
      this.router.navigate(['/auth']);
    }
  }

  // saveUser(data: any, ): void {
  //   const storage =  sessionStorage;
  //   storage.setItem(this.STORAGE_KEY, JSON.stringify(data || {}));
  // }

  saveUser(data: any): void {
  const enrichedData = {
    ...data,
    // merchantId: data?.merchantId || 0,
    // merchantName: data?.merchantName || '',
    // logoUrl: data?.logoUrl || '',
    // merchantCountryId: data?.merchantCountryId || 0,
    // userType: data?.userType || '', // If missing, default empty
  };

  const json = JSON.stringify(enrichedData);
  sessionStorage.setItem(this.STORAGE_KEY, json);
}

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string {
    return this.getStoredUser()?.jwtToken || '';
  }

  getUserId(): number {
    return this.getStoredUser()?.userId || 0;
  }

  getFullName(): string {
    return this.getStoredUser()?.fullName || '';
  }

  getEmail(): string {
    return this.getStoredUser()?.email || '';
  }

  getMerchantId(): number {
    return this.getStoredUser()?.merchantId || 0;
  }

  getMerchantName(): string {
    return this.getStoredUser()?.merchantName || '';
  }

  getProfileLogo(): string {
    return this.getStoredUser()?.logoUrl || '';
  }

  getUserType(): string {
    return this.getStoredUser()?.userType || '';
  }

  getUserTypeId(): number {
    return this.getStoredUser()?.userTypeId || 4;
  }

  getMerchantCountryId(): number {
    return this.getStoredUser()?.merchantCountryId || 0;
  }


  sendRecoveryEmail(email: string): Observable<ResponseDTO<any>> {
    return this.http.post('/user/forget-password', { email });
  }

  verifyResetToken(token: string): Observable<ResponseDTO<any>> {
    return this.http.post('/user/reset-password/token/verify', { resetPasswordToken: token });
  }

  updatePassword(form: { userId: number; newPassword: string; confirmPassword: string }): Observable<ResponseDTO<any>> {
    return this.http.post(`/user/${form.userId}/reset-password`, form);
  }

  updateUserProfile(data: any): Observable<ResponseDTO<any>> {
    return this.http.patch(`/user/${data.userId}`, data);
  }

  private getStoredUser(): any {
    return JSON.parse(sessionStorage.getItem(this.STORAGE_KEY) || '{}');
  }

  private clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
