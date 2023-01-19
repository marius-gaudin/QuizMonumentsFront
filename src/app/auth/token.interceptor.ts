import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { JwtTokenService } from '../services/jwt-token.service';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private jwtTokenService:JwtTokenService, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.jwtTokenService.getToken()
    let newRequest = request
    if(token !== null) {
      newRequest = request.clone({
        headers: request.headers.set('Authorization', `bearer ${token}`)
      })
      return next.handle(newRequest).pipe(
        catchError(error => {
          if(error.status === 401) {
            this.router.navigate(['login'])
          }
          return new Observable<any>(observer => {
            observer.next(new Error(error.message))
          })
        })
      )
    }
    return next.handle(newRequest)

  }
}