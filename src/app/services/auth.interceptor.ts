import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService:AuthenticationService, private router:Router) {}

  intercept(requestToHandle: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var authReq = requestToHandle.clone({url: requestToHandle.url.startsWith("https://") ? requestToHandle.url : (environment.baseUrl +  requestToHandle.url) }) ;
    const token = this.authService.getToken();
    if(token && !authReq.headers.get("Authorization")){
      const headers: HttpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      authReq = authReq.clone({headers})
    }


    return next.handle(authReq).pipe(
      tap((err: any) => {
        if (err) {
          if (err.status == 401) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(["/auth"]);
          }
        }
      }, (error:any) => {
          if (error.status == 401) {
            sessionStorage.clear();
            localStorage.clear();
            this.router.navigate(["/auth"]);
          }
      })
    );

  }
}
