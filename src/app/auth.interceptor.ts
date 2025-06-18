import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    let authReq = req;

    if (authToken) {
      authReq = req.clone({ 
        setHeaders: { Authorization: `Bearer ${authToken}` } 
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized!', error);
          this.authService.logout();
          this.router.navigate(['/login']);
        } 
        else if (error.status === 403) {
          console.error('Forbidden!', error);
        } 
        else if (error.error?.message) {
          console.error('API Error!', error.error.message);
        } 
        else {
          console.error('An unknown error occurred!', error);
        }

        return throwError(() => error);
      })
    );
  }
}

