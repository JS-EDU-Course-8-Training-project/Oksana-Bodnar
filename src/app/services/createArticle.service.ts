import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { catchError, map, Observable, throwError } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { crateArticle } from 'src/shared/models/createArticle.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class CreateAerticleService {
  public environment = environment;
  constructor(private http: HttpClient) {}

public postArticle(article: crateArticle): Observable<Articles> {
    return this.http.post<Articles>(`${this.environment.url}/articles`, { article })
    .pipe(catchError(this.handleError));
}
    
  public postNewArticle(article: crateArticle, slug: string | null): Observable<Articles> {
    return this.http.put<Articles>(`${this.environment.url}/articles/${slug}`, { article })
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