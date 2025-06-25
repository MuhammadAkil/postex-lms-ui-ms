import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, tap } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToHandle = req;

    if (!req.url.startsWith('http')) {
      requestToHandle = req.clone({ url: environment.baseUrl + req.url });
    }

    const token = this.authService.getToken();

    if (token && !requestToHandle.headers.has('Authorization')) {
      const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      requestToHandle = requestToHandle.clone({ headers });
    }

    return next.handle(requestToHandle).pipe(
      tap({
        error: (error: any) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            this.router.navigate(['/auth']);
          }
        }
      })
    );
  }
}
