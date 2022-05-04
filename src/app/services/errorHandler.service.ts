import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg;
                    let errorObj = {};
                    if (error.error instanceof ErrorEvent) {
                        errorMsg = `Error: ${error.error.message}`; 
                        console.log(`This is client side error ${errorMsg}`);
                    } else { if (error.error) {
                        errorObj = {
                            fieldError: Object.keys(error.error.errors).join(','),
                            problemError: Object.values(error.error.errors).join(',')
                        };
                        console.log(errorObj);
                    }}
                    return throwError(() => errorObj);
                })
            )
    }
}