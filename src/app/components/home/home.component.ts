import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { DOMEvent } from 'src/shared/models/domElement';
import { NewUser } from 'src/shared/models/newUser.model';
import { Tags } from 'src/shared/models/tags.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GetArticleService]
})

export class HomeComponent implements OnInit, OnDestroy {

  public articles$!: BehaviorSubject<Articles[] | null>;
  public articlesFeed$!: BehaviorSubject<Articles[] | null>;
  public tags$!: Subject<Tags[] | null>;
  public isLogged$!: Subject<NewUser | null>;
  public token!: string | null;
  public isOwnFeed = false;
  public isGlobal = true;
  private subscriptionArticle$!: Subscription;
  private subscriptionArticleFeed$!: Subscription;
  private subscriptionTags$!: Subscription;
  
  constructor(private httpService: GetArticleService,
  private userService: UserService) { }


  ngOnInit() {
    this.isLogged$ = this.userService.loggedUserModels$;
    this.tags$ = this.httpService.tags$;
    this.token = this.getToken();

    if (this.token) { 
    this.getArticlesYourFeed()
    }

    this.getArticles();
    this.getTags();
  }

  public getArticles() {
      this.articles$ = this.httpService.articles$;
      this.subscriptionArticle$ = this.httpService
        .getAllArticles()
        .subscribe();
  }
  
  public getToken() {
     return this.userService
       .getToken();
  }
  
  public getArticlesYourFeed() {
    this.articlesFeed$ = this.httpService.articlesFeed$;
    this.subscriptionArticleFeed$ = this.httpService
      .getArticlesFeed()
      .subscribe(
        val => { console.log(val) }
      );
  }

  public getTags() {
   this.subscriptionTags$ = this.httpService
      .getTags()
      .subscribe();
  }

  public showYourFeed() {
    this.isOwnFeed = true;
    this.isGlobal = false;
  }

  public showAllArticles() {
    this.isOwnFeed = false;
    this.isGlobal = true;
}

  ngOnDestroy() {
    if (this.subscriptionArticle$) {
      this.subscriptionArticle$.unsubscribe();
    }
    if (this.subscriptionArticleFeed$) {
      this.subscriptionArticleFeed$.unsubscribe();
    }
    if (this.subscriptionTags$) {
      this.subscriptionTags$.unsubscribe();
    }
    }
}
