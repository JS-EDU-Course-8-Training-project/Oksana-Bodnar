import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  public environment = environment;
  
  constructor(private http: HttpClient) { }

  public like(href: string) {
    return this.http.post(`${this.environment.url}/articles/${href}/favorite`, {})
      .pipe(catchError(this.handleError));
}

public likeDelete(href: string) {
    return this.http.delete(`${this.environment.url}/articles/${href}/favorite`, {})
      .pipe(catchError(this.handleError));
}
  
public handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      console.log(msg);
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(msg);
    }
    return throwError(msg);
}
}
