import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { Comments } from 'src/shared/models/comments.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private userService: UserService) { }
  public href!: string;
  public slug!: string;
  public article!: Articles;
  public comments!: Comments[];
  public isLogged!: boolean;
  
  // get slug for article opening (url - '#/editor/article-slug-here')
  getSlug() {
     this.href = this.router.url.split('/').slice(-1).toString();
  }

  // get article (with slug)
  getArticle(): Observable<Articles> {
      return this.http.get<Articles>(`https://api.realworld.io/api/articles/${this.href}`)
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
  }

  // get comments for article (with slug)
  getComments(): Observable<Comments[]> {
      return this.http.get<Comments[]>(`https://api.realworld.io/api/articles/${this.href}/comments`)
          .pipe(map((res: any) => {
                  return res.comments;
              })).pipe(catchError(this.handleError));
  }

  // invoking fns for getting needed data
  ngOnInit(): void {
    
    this.getSlug();
    this.getArticle().subscribe(data => {
      this.article = data;
    });
    this.getComments().subscribe(data => {
      this.comments = data;
    });
    this.isLoggedUser();
  }

  // check if user is logged in
  isLoggedUser() {
    this.isLogged = this.userService.isLoggedIn();
  }

    // Error handling
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }

}
