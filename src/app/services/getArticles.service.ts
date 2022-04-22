import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class GetArticleService {
public environment = environment;
 
  constructor(private http: HttpClient) {}
  public getAllArticles(): Observable<Articles[]> {
      return this.http.get<Articles[]>(`${this.environment.url}/articles`)
        .pipe(map((res: any) => {
          console.log(res);
                  return res.articles;
              })).pipe(catchError(this.handleError));
  }

  public getTags(): Observable<Tags[]> {
      return this.http.get<Tags[]>(`${this.environment.url}/tags`)
          .pipe(map((res: any) => {
                  return res.tags;
              })).pipe(catchError(this.handleError));
  }

   public getArticlesFeed(): Observable<Articles[]> {
      return this.http.get<Articles[]>(`${this.environment.url}/articles/feed`)
          .pipe(map((res: any) => {
                  return res.articles;
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
