import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { Comments } from 'src/shared/models/comments.model';
import { NewComment } from 'src/shared/models/newComment.model';

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
     })
  }
  
  
public getSlug() {
     this.href = this.router.url.split('/').slice(-1).toString();
  }


public getArticle(): Observable<Articles> {
      return this.http.get<Articles>(`https://api.realworld.io/api/articles/${this.href}`)
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

public getComments(): Observable<Comments[]> {
      return this.http.get<Comments[]>(`https://api.realworld.io/api/articles/${this.href}/comments`)
          .pipe(map((res: any) => {
                  return res.comments;
              })).pipe(catchError(this.handleError));
  }


  
    
public publish(): void {
   this.newComment = this.newCommentForm.value;
    console.log(this.newComment);
      this.postCommentService(this.newComment)
        .subscribe(
          {
            next: () => {
            this.router.navigateByUrl(`article/${this.href}`)
            console.log("Comment Published!")},
            error: (err) => {console.log(err);}
          }); 
    }
 
public postCommentService(comment: NewComment): Observable<Comments> {
    return this.http.post<Comments>(`https://api.realworld.io/api/articles/${this.href}/comments`, { comment })
    .pipe(map((res: any) => {
                  return res.comments;
              })).pipe(catchError(this.handleError));
}
  
public followService() {
      return this.http.post(`https://api.realworld.io/api/profiles/${this.article.author.username}/follow`, {})
      .pipe(catchError(this.handleError));
  }
  
public follow() {
        this.followService()
        .subscribe(
          {next: () => {
            // this.router.navigateByUrl(`article/${this.href}`)
            console.log(this.article.favoritesCount);
            console.log("follow!")},
            error: (err) => {console.log(err);}
          }); 
  }

public likeService() {
    return this.http.post(`https://api.realworld.io/api/articles/${this.href}/favorite`, {})
      .pipe(catchError(this.handleError));
  }

public like(): void {
      this.likeService()
        .subscribe(
          {next: () => {
            // this.router.navigateByUrl(`article/${this.href}`)

            console.log("like!")},
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
