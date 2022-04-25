import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetArticleService {
  public environment = environment;
  public articles$: BehaviorSubject<Articles[] | any> = new BehaviorSubject([]);
  public tags$: Subject<Tags[] | null> = new Subject();
  public articlesFeed$: BehaviorSubject<Articles[] | any> = new BehaviorSubject([]);
  public slug!: string | null;
 
  constructor(private http: HttpClient) { }
  
  public getAllArticles(): Observable<Articles[]> {
      return this.http.get<Articles[]>(`${this.environment.url}/articles`)
        .pipe(map((res: any) => {
          this.articles$.next(res.articles);
          console.log(res.articles);
                  return res.articles;
              })).pipe(catchError(this.handleError));
  }

  public getTags(): Observable<Tags[]> {
      return this.http.get<Tags[]>(`${this.environment.url}/tags`)
        .pipe(map((res: any) => {
          this.tags$.next(res.tags);
                  return res.tags;
              })).pipe(catchError(this.handleError));
  }

  public getArticleSlug(slug: string): string {
      return this.slug = slug;
  }

  public getArticle(slug: string | null): Observable<Articles> {
      return this.http.get<Articles>(`${this.environment.url}/articles/${slug}`, {})
        .pipe(map((res: any) => {
            
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

  public deleteArticle(): Observable<Articles> {
      return this.http.delete<Articles>(`${this.environment.url}/articles/${this.slug}`)
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

  public getArticlesFeed(): Observable<Articles[]> {
      return this.http.get<Articles[]>(`${this.environment.url}/articles/feed`)
        .pipe(map((result: any) => {
          console.log(result.articles);
          this.articlesFeed$.next(result.articles);
                  return result.articles;
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
