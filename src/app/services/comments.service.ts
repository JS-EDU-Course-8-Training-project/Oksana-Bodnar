import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comments } from 'src/shared/models/comments.model';
import { NewComment } from 'src/shared/models/newComment.model';

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
      return this.http.get(`${this.environment.url}/articles/${this.slug}/comments`)
        .pipe(map((res: any) => {
          res.comments.forEach((value: Comments) => { return this.id = value.id });
          this.comments$.next(res.comments);
                return res.comments;
              })).pipe(catchError(this.handleError));
  }

  public deleteCommentService(): Observable<null> {
      return this.http.delete<null>(`${this.environment.url}/articles/${this.slug}/comments/${this.id}`, {})
      .pipe(catchError(this.handleError));
  }

  public postCommentService(comment: NewComment): Observable<Comments> {
    return this.http.post<Comments>(`${this.environment.url}/articles/${this.slug}/comments`, { comment })
      .pipe(map((res: any) => {
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
