import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Articles } from 'src/app/shared/models/articles.model';
import { Tags } from 'src/app/shared/models/tags.model';
import { environment } from 'src/environments/environment';
import { ArticleResult } from 'src/app/shared/models/ArticleResult.model';

@Injectable({
  providedIn: 'root'
})
export class GetArticleService {
  public environment = environment;
  public articles$: BehaviorSubject<Articles[]> = new BehaviorSubject([] as Articles[]);
  public tags$: Subject<Tags[] | null> = new Subject();
  public articlesFeed$: BehaviorSubject<Articles[]> = new BehaviorSubject([] as Articles[]);
  public slug!: string | null;
 
  constructor(private http: HttpClient) { }
  
  public getAllArticles(): Observable<Articles[]> {
    return this.http.get < {articles: Articles[]} >(`${this.environment.url}/articles?offset=0`)
        .pipe(map((res: {articles: Articles[]}) => {
          this.articles$.next(res.articles);
                  return res.articles;
              })).pipe(catchError(this.handleError));
  }

  public getTags(): Observable<Tags[]> {
      return this.http.get<{tags: Tags[]}>(`${this.environment.url}/tags`)
        .pipe(map((res: {tags: Tags[]}) => {
          this.tags$.next(res.tags);
                  return res.tags;
              })).pipe(catchError(this.handleError));
  }

  public getArticleSlug(slug: string): string {
      return this.slug = slug;
  }

  public getArticle(slug: string | null): Observable<Articles> {
      return this.http.get< {article: Articles}>(`${this.environment.url}/articles/${slug}`, {})
        .pipe(map((res: {article: Articles} ) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

  public deleteArticle(): Observable<Articles> {
      return this.http.delete<{article: Articles}>(`${this.environment.url}/articles/${this.slug}`)
          .pipe(map((res: {article: Articles}) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

  public getArticlesFeed(): Observable<Articles[]> {
    return this.http.get<{ articles: Articles[] }>(`https://api.realworld.io/api/articles/feed/?offset=0`)
        .pipe(map((result: {articles: Articles[]}) => {
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
