import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
        }))
  }

  public deleteCommentService(): Observable<null> {
    return this.http.delete<null>(`${this.environment.url}/articles/${this.slug}/comments/${this.id}`, {})
  }

  public postCommentService(comment: NewComment): Observable<Comments[]> {
    return this.http.post<{comments: Comments[]}>(`${this.environment.url}/articles/${this.slug}/comments`, { comment })
      .pipe(map((res: {comments: Comments[]}) => {
        return res.comments;
    }))
  }

}
