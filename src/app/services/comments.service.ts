import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comments } from 'src/app/shared/models/comments.model';
import { NewComment } from 'src/app/shared/models/newComment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private environment = environment;
  private slug!: string;
  private id!: number;
  public comments$: BehaviorSubject<Comments[]> = new BehaviorSubject<Comments[]>([]);
  
  
  constructor(private http: HttpClient) { }

  public getArticleSlug(slug: string): string {
      return this.slug = slug;
    }
  
  public getComments(): Observable<Comments[]> {
      return this.http.get< {comments: Comments[]} >(`${this.environment.url}/articles/${this.slug}/comments`)
        .pipe(map((res: {comments: Comments[]}) => {
          res.comments.forEach((value: Comments) => { return this.id = value.id });
          this.comments$.next(res.comments);
                return res.comments;
              })).pipe(catchError(this.handleError));
  }

  //  public getAllArticles(): Observable<Articles[]> {
  //   return this.http.get < {articles: Articles[]} >(`${this.environment.url}/articles`)
  //       .pipe(map((res: {articles: Articles[]}) => {
  //         this.articles$.next(res.articles);
  //                 return res.articles;
  //             })).pipe(catchError(this.handleError));
  // }

  public deleteCommentService(): Observable<null> {
      return this.http.delete<null>(`${this.environment.url}/articles/${this.slug}/comments/${this.id}`, {})
      .pipe(catchError(this.handleError));
  }

  public postCommentService(comment: NewComment): Observable<Comments[]> {
    return this.http.post<{comments: Comments[]}>(`${this.environment.url}/articles/${this.slug}/comments`, { comment })
      .pipe(map((res: {comments: Comments[]}) => {
          return res.comments;
          })).pipe(catchError(this.handleError));
}

  private handleError(error: HttpErrorResponse) {
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
