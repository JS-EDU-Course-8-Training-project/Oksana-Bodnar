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
  public length!: number;
  public input!: string | null;
  public page = 1;
  public count = 0;
  public pageSize = 3;
  private subscriptionArticle$!: Subscription;
  private subscriptionArticleFeed$!: Subscription;
  private subscriptionTags$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(private getArticleService: GetArticleService,
  private userService: UserService) { }

  ngOnInit() {
    this.isLogged$ = this.userService.loggedUserModels$;
    this.tags$ = this.getArticleService.tags$;
    this.token = this.getToken();
    this.getArticles(50, this.page);
    this.getTags();
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  public getArticles(limit: number, page: number): void {
      this.articles$ = this.getArticleService.articles$;
      this.subscriptionArticle$ = this.getArticleService.getAllArticles(limit, page).subscribe(value => this.length = value.length);
      this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getArticlesByTag(limit: number, page: number, tag: string): void {
      this.articles$ = this.getArticleService.articles$;
      this.subscriptionArticle$ = this.getArticleService.getAllArticlesByTag(limit, page, tag).subscribe(value => this.length = value.length);
      this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getArticlesYourFeed(limit: number, page: number): void {
      this.articles$ = this.getArticleService.articlesFeed$;
      this.subscriptionArticleFeed$ = this.getArticleService.getArticlesFeed(limit, page).subscribe(value => this.length = value.length);
      this.subscriptions$.push(this.subscriptionArticleFeed$);
   }

  public getToken(): string | null {
    return this.userService.getToken();
  }
  
  public getTags(): void {
    this.subscriptionTags$ = this.getArticleService.getTags().subscribe();
    this.subscriptions$.push(this.subscriptionTags$);
  }

  public showYourFeed(): void {
    this.page = 1;
    this.isOwnFeed = true;
    this.isGlobal = false;
    
    if (this.token) { 
      this.getArticlesYourFeed(50, this.page)
    }
  }

  public showAllArticles(): void {
    this.isOwnFeed = false;
    this.isGlobal = true;
    this.page = 1;
    this.getArticles(50, this.page);
  }
  
  public onTag(event: DOMEvent<any>): void {
    this.page = 1;
    this.input = event.target.innerText;
    if (this.input) {
      this.getArticlesByTag(50, 0, this.input);
    }
  }

  public deleteTag(): void {
    this.input = null;
    this.showAllArticles();
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {if (subscription) { subscription.unsubscribe() } })
  }
}
