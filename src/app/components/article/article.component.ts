import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Articles } from 'src/shared/models/articles.model';
import { Comments } from 'src/shared/models/comments.model';
import { NewComment } from 'src/shared/models/newComment.model';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  public slug!: string;
  public article!: Articles;
  public comments!: Comments[];
  public newComment!: NewComment;
  public isLogged!: boolean;
  public newCommentForm!: FormGroup;
  public clickedLike = false;
  public clickedFollow = false;
  public href!: string;
  public id!: string;
  public user!: NewUser;
  public environment = environment;
  
  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }


    ngOnInit(): void {
    
    this.getSlug();
    this.getArticle().subscribe(data => {
      this.article = data;
    });
    this.getComments().subscribe(data => {
      this.comments = data;
    });
    this.isLogged = this.userService.isLoggedIn();
    
      this.newCommentForm = new FormGroup({
        body: new FormControl(''),
      });

      this.getNewUser()
     .subscribe(data => {
        return this.user = data;
      });
  }
  
  
public getSlug() {
     this.href = this.router.url.split('/').slice(-1).toString();
  }


public getArticle(): Observable<Articles> {
      return this.http.get<Articles>(`${this.environment.url}/articles/${this.href}`, {})
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
}
  
  public deleteArticle(): Observable<Articles> {
      return this.http.delete<Articles>(`${this.environment.url}/articles/${this.href}`)
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

public getComments(): Observable<Comments[]> {
      return this.http.get<Comments[]>(`${this.environment.url}/articles/${this.href}/comments`)
          .pipe(map((res: any) => {
                  return res.comments;
              })).pipe(catchError(this.handleError));
}
  // /articles/{slug}/comments/{id}
  public deleteComment(): Observable<Comments> {
      return this.http.delete<Comments>(`${this.environment.url}/articles/${this.href}/comments/${this.id}`, {})
          .pipe(map((res: any) => {
                  return res.comment;
              })).pipe(catchError(this.handleError));
  }

public publish(): void {
   this.newComment = this.newCommentForm.value;
      this.postCommentService(this.newComment)
        .subscribe(
          {next: () => {
            console.log("Comment Published!")},
            error: (err) => {console.log(err);}
          }); 
    }
 
public postCommentService(comment: NewComment): Observable<Comments> {
    return this.http.post<Comments>(`${this.environment.url}/articles/${this.href}/comments`, { comment })
      .pipe(map((res: any) => {
          return res.comments;
          })).pipe(catchError(this.handleError));
}
  
public followService() {
      return this.http.post(`${this.environment.url}/profiles/${this.article.author.username}/follow`, {})
      .pipe(catchError(this.handleError));
  }
  
public follow() {
        this.followService()
        .subscribe(
          {next: () => {
            console.log(this.article.favoritesCount);
            console.log("follow!")},
            error: (err) => {console.log(err);}
          }); 
  }

public likeService() {
    return this.http.post(`${this.environment.url}/articles/${this.href}/favorite`, {})
      .pipe(catchError(this.handleError));
  }

public like(): void {
      this.likeService()
        .subscribe(
          {next: () => {
            console.log("like!")},
            error: (err) => {console.log(err);}
          }); 
}
  
   public getNewUser() {
      return this.userService.getLoggedUser()
   }
  
  delete() {
    this.router.navigateByUrl('');
      this.deleteArticle()
        .subscribe(
          {
            next: () => {
            console.log("delete!")},
            error: (err) => {console.log(err);}
          }); 
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
