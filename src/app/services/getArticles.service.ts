import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { Articles } from 'src/app/shared/models/articles.model';
import { Tags } from 'src/app/shared/models/tags.model';
import { environment } from 'src/environments/environment';
import { CreateArticle } from '../shared/models/createArticle.model';

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
  
  public getAllArticles(limit: number, offset: number): Observable<Articles[]> {
    return this.http.get < {articles: Articles[]} >(`${this.environment.url}/articles?limit=${limit}&offset=${offset}`)
        .pipe(map((res: {articles: Articles[]}) => {
          this.articles$.next(res.articles);
                  return res.articles;
              }))
  }

    public getAllFavoritedArticles(limit: number, offset: number, userName: string): Observable<Articles[]> {
    return this.http.get < {articles: Articles[]} >(`${this.environment.url}/articles?limit=${limit}&offset=${offset}&favorited=${userName}`)
        .pipe(map((res: {articles: Articles[]}) => {
          this.articles$.next(res.articles);
                  return res.articles;
              }))
  }

    public getAllArticlesByTag(limit: number, offset: number = 0, tag: string): Observable<Articles[]> {
    return this.http.get < {articles: Articles[]} >(`${this.environment.url}/articles?limit=${limit}&offset=${offset}&tag=${tag}`)
        .pipe(map((res: {articles: Articles[]}) => {
          this.articles$.next(res.articles);
                  return res.articles;
              }))
  }

  public getTags(): Observable<Tags[]> {
      return this.http.get<{tags: Tags[]}>(`${this.environment.url}/tags`)
        .pipe(map((res: {tags: Tags[]}) => {
          this.tags$.next(res.tags);
          return res.tags;
              }))
  }

  public getArticleSlug(slug: string): string {
      return this.slug = slug;
  }

  public getArticle(slug: string | null): Observable<Articles> {
      return this.http.get< {article: Articles}>(`${this.environment.url}/articles/${slug}`, {})
        .pipe(map((res: { article: Articles }) => {
                  return res.article;
              }))
  }

  public deleteArticle() {
    return this.http.delete<null>(`${this.environment.url}/articles/${this.slug}`)
  }

  public getArticlesFeed(limit: number, offset: number): Observable<Articles[]> {
    return this.http.get<{ articles: Articles[] }>(`${this.environment.url}/articles/feed/?limit=${limit}&offset=${offset}`)
        .pipe(map((result: {articles: Articles[]}) => {
          this.articlesFeed$.next(result.articles);
                  return result.articles;
              }))
  }

  public postArticle(article: CreateArticle) {
    return this.http.post(`${this.environment.url}/articles`, { article })
  }
    
  public postUpdatedArticle(article: CreateArticle, slug: string | null) {
    return this.http.put(`${this.environment.url}/articles/${slug}`, { article })
}

}

