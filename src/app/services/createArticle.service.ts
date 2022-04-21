import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { crateArticle } from 'src/shared/models/createArticle.model';


@Injectable()
export class CreateAerticleService {
  constructor(private http: HttpClient) {}

public postArticle(article: crateArticle): Observable<Articles> {
    return this.http.post<Articles>('https://api.realworld.io/api/articles', { article })
    .pipe(catchError(this.handleError));
}
    
public handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}