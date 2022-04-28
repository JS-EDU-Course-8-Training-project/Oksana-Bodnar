import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    let errorObj = {};
                    if (error.error instanceof ErrorEvent) {
                        console.log('This is client side error');
                        errorMsg = `Error: ${error.error.message}`; 
                    } else {
                console.log('This is server side error');
                errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                let fieldError = Object.keys(error.error.errors).join(',');
                let problemError = Object.values(error.error.errors).join(',');
                console.log(fieldError);
                console.log(problemError);
                     errorObj = {
                        fieldError: Object.keys(error.error.errors).join(','),
                        problemError: Object.values(error.error.errors).join(',')
                }
                    }
                    return throwError(() => errorObj);
                })
            )
    }
}