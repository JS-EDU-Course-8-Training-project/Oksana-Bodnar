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
import { Articles } from 'src/app/shared/models/articles.model';
import { Comments } from 'src/app/shared/models/comments.model';
import { NewComment } from 'src/app/shared/models/newComment.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  providers: [GetArticleService, CommentsService, FollowService, LikeService]
})
export class ArticleComponent implements OnInit, OnDestroy {

  public article!: Articles;
  public comments$!: BehaviorSubject<Comments[]>;
  public newComment!: NewComment;
  public newCommentForm!: FormGroup;
  public href!: string;
  public user!: ResponseUser;
  public environment = environment;
  public isFollow: boolean = false;
  public isLike: boolean = false;
  public likeCounter!: number;
  public subscriptionArticle$!: Subscription;
  public subscriptionNewUser$!: Subscription;
  public subscriptionComments$!: Subscription;
  public subscriptionCommentsDelete$!: Subscription;
  public subscriptionCommentsPublish$!: Subscription;
  public subscriptionFollowing$!: Subscription;
  public subscriptionUnFollowing$!: Subscription;
  public subscriptionLike$!: Subscription;
  public subscriptionDeleteLike$!: Subscription;
  public subscriptionDeleteArticle$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  
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

    this.getArticle();
 
    this.provideUser();

    this.newCommentForm = new FormGroup({
      body: new FormControl(''),
    });
  }

  public getArticle() {
      this.subscriptionArticle$ = this.articleService.getArticle(this.href).subscribe(data => {
      this.likeCounter = data.favoritesCount;

      this.isFollow = data.author.following;
      this.isLike = data.favorited;
    
      return this.article = data
  });
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public provideUser() {
        if (this.userService.getToken()) {
      this.subscriptionNewUser$ = this.userService.getLoggedUser().subscribe(data => { return this.user = data });
    };
    this.subscriptions$.push(this.subscriptionNewUser$);
  }
  
  public getSlug() {
    this.href = this.router.url.split('/').slice(-1).toString();
    this.articleService.getArticleSlug(this.href);
    this.commentService.getArticleSlug(this.href);
  }

  public getComments() {
    this.comments$ = this.commentService.comments$;
    this.subscriptionComments$ = this.commentService.getComments().subscribe();
    this.subscriptions$.push(this.subscriptionComments$);
  }

  public deleteComment(): void {
   this.subscriptionCommentsDelete$ =  this.commentService.deleteCommentService()
     .subscribe(() => this.getComments());
    this.subscriptions$.push(this.subscriptionCommentsDelete$);
  }

  public publishComment(): void {
    if (this.newCommentForm) {
      this.newComment = this.newCommentForm.value;
    }
    this.subscriptionCommentsPublish$ =   this.commentService.postCommentService(this.newComment)
      .subscribe(() => this.getComments());
    this.subscriptions$.push(this.subscriptionCommentsPublish$);
  }

  public onClickFollow() {
    if (this.article) {
      this.isFollow = !this.isFollow;
      if (this.isFollow) { this.follow() } else { this.unFollow() };
    }
  }

  public onClickLike() {
    this.isLike = !this.isLike;
    if(this.isLike) { this.like() } else { this.likeDelete() };
  }
  
  public follow() {
    if (this.article) {
      this.subscriptionFollowing$ = this.followService.follow(this.article.author.username)
        .subscribe();
      this.subscriptions$.push(this.subscriptionFollowing$);
    }
  }

  
  public unFollow() {
    if (this.article) {
      this.subscriptionUnFollowing$ = this.followService.unFollow(this.article.author.username)
        .subscribe();
      this.subscriptions$.push(this.subscriptionUnFollowing$);
    }
  }

public like(): void {
     this.subscriptionLike$ = this.likeService.like(this.href)
       .subscribe(
         () => {return this.likeCounter += 1 }
  ); 
   this.subscriptions$.push(this.subscriptionLike$);
}

public likeDelete(): void {
  this.subscriptionDeleteLike$ = this.likeService.likeDelete(this.href)
    .subscribe(
      () => { return this.likeCounter -= 1 }
  ); 
  this.subscriptions$.push(this.subscriptionDeleteLike$);
}
  
  deleteArticle() {
    this.router.navigateByUrl('');
     this.subscriptionDeleteArticle$ = this.articleService.deleteArticle()
      .subscribe(); 
    this.subscriptions$.push(this.subscriptionDeleteArticle$);
  }
  
  ngOnDestroy() {
        this.subscriptions$.forEach((subscription) => {if (subscription) { subscription.unsubscribe() } })
  }
}

