import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { FollowService } from 'src/app/services/follow.service';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { LikeService } from 'src/app/services/like.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { Articles } from 'src/shared/models/articles.model';
import { Comments } from 'src/shared/models/comments.model';
import { NewComment } from 'src/shared/models/newComment.model';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [GetArticleService, CommentsService, FollowService, LikeService]
})
export class ArticleComponent implements OnInit {

  public slug!: string;
  public article!: Articles;
  public comments$!: BehaviorSubject<Comments[]>;
  public newComment!: NewComment;
  public isLogged!: string | null;
  public newCommentForm!: FormGroup;
  public href!: string;
  public id!: number;
  public user!: NewUser;
  public environment = environment;
  public isFollow: boolean = false;
  public isLike: boolean = false;
  public likeCounter!: number;

  
  constructor(
    private router: Router,
    private userService: UserService,
    private articleService: GetArticleService,
    private commentService: CommentsService,
    private followService: FollowService,
    private likeService: LikeService) { }


  ngOnInit(): void {
    this.getSlug();

    this.getComments();
    this.articleService.getArticle(this.href).subscribe(data => {
      this.likeCounter = data.favoritesCount;
      return this.article = data
    });
    this.getNewUser().subscribe(data => { return this.user = data });
      
    this.newCommentForm = new FormGroup({
      body: new FormControl(''),
    });
  }

  
  
  public getSlug() {
    this.href = this.router.url.split('/').slice(-1).toString();
    // this.articleService.getArticleSlug(this.href);
    this.commentService.getArticleSlug(this.href);
  }

  private getComments() {
    this.comments$ = this.commentService.comments$;
    this.commentService.getComments().subscribe();
  }

  public deleteComment(): void {
    this.commentService.deleteCommentService()
      .subscribe(() => this.getComments());
  }

  public publishComment(): void {
    this.newComment = this.newCommentForm.value;
    this.commentService.postCommentService(this.newComment)
      .subscribe(() => this.getComments());
  }

  public onClickFollow() {
    this.isFollow = !this.isFollow;
    if(this.isFollow) { this.follow() } else { this.unFollow() };
  }

   public onClickLike() {
    this.isLike = !this.isLike;
    if(this.isLike) { this.like() } else { this.likeDelete() };
  }
  
  public follow() {
    this.followService.follow(this.article.author.username)
      .subscribe();
  }

  
  public unFollow() {
        this.followService.unFollow(this.article.author.username)
        .subscribe(); 
  }

public like(): void {
      this.likeService.like(this.href)
        .subscribe(); 
}

public likeDelete(): void {
      this.likeService.likeDelete(this.href)
        .subscribe(); 
}
  
   public getNewUser() {
      return this.userService.getLoggedUser()
   }
  
  deleteArticle() {
    this.router.navigateByUrl('');
      this.articleService.deleteArticle()
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
      console.log(msg);
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(msg);
    }
    return throwError(msg);
}
}

