import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription, throwError } from 'rxjs';
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
export class ArticleComponent implements OnInit, OnDestroy {

  // public slug!: string;
  public article!: Articles;
  public comments$!: BehaviorSubject<Comments[]>;
  public newComment!: NewComment;
  // public isLogged!: string | null;
  public newCommentForm!: FormGroup;
  public href!: string;
  // public id!: number;
  public user!: NewUser;
  public environment = environment;
  public isFollow: boolean = false;
  public isLike: boolean = false;
  public likeCounter!: number;
  private subscriptionArticle$!: Subscription;
  private subscriptionNewUser$!: Subscription;
  private subscriptionComments$!: Subscription;
  private subscriptionCommentsDelete$!: Subscription;
  private subscriptionCommentsPublish$!: Subscription;
  private subscriptionFollowing$!: Subscription;
  private subscriptionUnFollowing$!: Subscription;
  private subscriptionLike$!: Subscription;
  private subscriptionDeleteLike$!: Subscription;
  private subscriptionDeleteArticle$!: Subscription;
  
  
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
    this.subscriptionArticle$ = this.articleService.getArticle(this.href).subscribe(data => {
      this.likeCounter = data.favoritesCount;
      return this.article = data
    });

    this.subscriptionNewUser$ = this.getNewUser().subscribe(data => { return this.user = data });
      
    this.newCommentForm = new FormGroup({
      body: new FormControl(''),
    });
  }

  
  public getSlug() {
    this.href = this.router.url.split('/').slice(-1).toString();
    this.articleService.getArticleSlug(this.href);
    this.commentService.getArticleSlug(this.href);
  }

  private getComments() {
    this.comments$ = this.commentService.comments$;
   this.subscriptionComments$ = this.commentService.getComments().subscribe();
  }

  public deleteComment(): void {
   this.subscriptionCommentsDelete$ =  this.commentService.deleteCommentService()
      .subscribe(() => this.getComments());
  }

  public publishComment(): void {
    this.newComment = this.newCommentForm.value;
    this.subscriptionCommentsPublish$ =   this.commentService.postCommentService(this.newComment)
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
   this.subscriptionFollowing$ = this.followService.follow(this.article.author.username)
      .subscribe();
  }

  
  public unFollow() {
    this.subscriptionUnFollowing$ = this.followService.unFollow(this.article.author.username)
        .subscribe(); 
  }

public like(): void {
     this.subscriptionLike$ = this.likeService.like(this.href)
       .subscribe(
         () => {return this.likeCounter += 1 }
        ); 
}

public likeDelete(): void {
  this.subscriptionDeleteLike$ = this.likeService.likeDelete(this.href)
    .subscribe(
      () => { return this.likeCounter -= 1 }
        ); 
}
  
   public getNewUser() {
      return this.userService.getLoggedUser()
   }
  
  deleteArticle() {
    this.router.navigateByUrl('');
     this.subscriptionDeleteArticle$ = this.articleService.deleteArticle()
        .subscribe(); 
  }
  
  ngOnDestroy() {
    if (this.subscriptionArticle$) {
      this.subscriptionArticle$.unsubscribe();
    }
    if (this.subscriptionNewUser$) {
      this.subscriptionNewUser$.unsubscribe();
    }
    if (this.subscriptionComments$) {
      this.subscriptionComments$.unsubscribe();
    }
    if (this.subscriptionCommentsDelete$) {
      this.subscriptionCommentsDelete$.unsubscribe();
    }
    if (this.subscriptionCommentsPublish$) {
      this.subscriptionCommentsPublish$.unsubscribe();
    }
    if (this.subscriptionFollowing$) {
      this.subscriptionFollowing$.unsubscribe;
    }
    if (this.subscriptionUnFollowing$) {
      this.subscriptionUnFollowing$.unsubscribe();
    }
    if (this.subscriptionLike$) {
      this.subscriptionLike$.unsubscribe();
    }
    if (this.subscriptionDeleteLike$) {
      this.subscriptionDeleteLike$.unsubscribe();
    }
    if (this.subscriptionDeleteArticle$) {
      this.subscriptionDeleteArticle$.unsubscribe();
    }
    }
}

