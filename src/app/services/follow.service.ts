import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

public environment = environment;
  
  constructor(private http: HttpClient) { }

  public follow(name: string) {
      return this.http.post(`${this.environment.url}/profiles/${name}/follow`, {})
        .pipe(map(() => {
              })).pipe(catchError(this.handleError));
  }
  
  public unFollow(name: string) {
      return this.http.delete(`${this.environment.url}/profiles/${name}/follow`, {})
      .pipe(map(() => {
        })).pipe(catchError(this.handleError));
  }
  
  public handleError(error: HttpErrorResponse) {
    let msg: string;
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      console.log(msg);
    } else {
    console.log(error.error);
    }
    return throwError(error);
}
}
