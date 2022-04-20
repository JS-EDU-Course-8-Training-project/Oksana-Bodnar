import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';

@Injectable()
export class GetArticleService {
  constructor(private http: HttpClient) {}

 public getAllArticles(): Observable<Articles[]> {
      return this.http.get<Articles[]>('https://api.realworld.io/api/articles')
          .pipe(map((res: any) => {
                  return res.articles;
              })).pipe(catchError(this.handleError));
  }

  public getTags(): Observable<Tags[]> {
      return this.http.get<Tags[]>('https://api.realworld.io/api/tags')
          .pipe(map((res: any) => {
                  return res.tags;
              })).pipe(catchError(this.handleError));
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
