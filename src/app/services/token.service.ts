import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor(public auth: UserService) {}

   public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.getToken()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Token ${this.auth.getToken()}`
                }
            });

            return next.handle(request);
        } else { return next.handle(request)}
    }
}