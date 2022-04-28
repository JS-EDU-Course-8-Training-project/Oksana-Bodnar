import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/app/shared/models/articles.model';
import { DOMEvent } from 'src/app/shared/models/domElement';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';
import { Tags } from 'src/app/shared/models/tags.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GetArticleService]
})

export class HomeComponent implements OnInit, OnDestroy {

  public articles$!: BehaviorSubject<Articles[]>
  public tags$!: Subject<Tags[] | null>;
  public isLogged$!: Subject<ResponseUser | null>;
  public token!: string | null;
  public isOwnFeed = false;
  public isGlobal = true;
  public articles!: Articles[];
  public input!: string | null;
  public page = 1;
  public count = 0;
  public pageSize = 3;
  private subscriptionArticle$!: Subscription;
  private subscriptionArticleFeed$!: Subscription;
  private subscriptionTags$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(private httpService: GetArticleService,
  private userService: UserService) { }


  ngOnInit() {
    this.isLogged$ = this.userService.loggedUserModels$;
    this.tags$ = this.httpService.tags$;
    this.token = this.getToken();
    this.getArticles(10, this.page);
    this.getTags();
  }

  handlePageChange(event: any) {
    this.page = event;
  }

  public getArticles(limit: number, page: number) {
      this.articles$ = this.httpService.articles$;
      this.subscriptionArticle$ = this.httpService
        .getAllArticles(limit, page)
        .subscribe();
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getArticlesByTag(limit: number, page: number, tag: string) {
      this.articles$ = this.httpService.articles$;
      this.subscriptionArticle$ = this.httpService
        .getAllArticlesByTag(limit, page, tag)
        .subscribe();
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getArticlesYourFeed(limit: number, page: number) {
     this.articles$ = this.httpService.articlesFeed$;
    this.subscriptionArticleFeed$ = this.httpService
      .getArticlesFeed(limit, page)
      .subscribe(val => this.articles = val);
     this.subscriptions$.push(this.subscriptionArticleFeed$);
   }

  public getToken() {
     return this.userService
       .getToken();
  }
  
  public getTags() {
    this.subscriptionTags$ = this.httpService
      .getTags()
      .subscribe();
    this.subscriptions$.push(this.subscriptionTags$);
  }

  public showYourFeed() {
    this.page = 1;
    this.isOwnFeed = true;
    this.isGlobal = false;
    
     if (this.token) { 
    this.getArticlesYourFeed(10, this.page)
    }

  }

  public showAllArticles() {
    this.isOwnFeed = false;
    this.isGlobal = true;
    this.page = 1;
      this.getArticles(10, this.page);
  }
  
  public onTag(event: DOMEvent<any>) {
    this.page = 1;
    this.input = event.target.innerText;
    if (this.input) {
      this.getArticlesByTag(10, 0, this.input);
    }
  }

  public DeleteTag() {
    this.input = null;
    this.showAllArticles();
  }

  ngOnDestroy() {
    if(this.subscriptions$) {
        this.subscriptions$.forEach((subscription) => subscription.unsubscribe())
    }}
}
