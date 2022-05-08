import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/app/shared/models/articles.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [GetArticleService]
})
  
export class ProfileComponent implements OnInit, OnDestroy {
  public isFavourite = false;
  public isOwn = false;
  public user!: ResponseUser;
  public articles$!: BehaviorSubject<Articles[]>
  public isLogged!: string | null;
  public page = 1;
  public count!: number;
  public pageSize = 3;
  public length!: number;
  private subscriptionUser$!: Subscription;
  private subscriptionArticle$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(private httpService: GetArticleService, private userService: UserService) { }
  
  ngOnInit(): void { 
    this.articles$ = this.httpService.articles$; 
    this.isLogged = this.userService.getToken();
    this.subscriptionUser$ = this.getNewUser().subscribe(data => {
        return this.user = data;
    });
    this.subscriptions$.push(this.subscriptionUser$);
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  public getArticles(author: string, limit: number, offset: number): void {
    this.articles$ = this.httpService.articles$; 
    this.subscriptionArticle$ = this.httpService.getOwnArticles(author, limit, offset).subscribe(value => this.length = value.length)
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getFavoritedArticles(limit: number, offset: number, user: string): void {
    this.articles$ = this.httpService.articles$;
    if (this.user) {
      this.subscriptionArticle$ = this.httpService.getAllFavoritedArticles(limit, offset, user)
        .subscribe(value => this.length = value.length)
    }
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public showOwnArticles(): void { 
    this.page = 1;
    this.isOwn = true;
    this.isFavourite = false;
    if (this.user) {
      this.getArticles(this.user.username, 50, 0);
    }
  }

  public showFavouriteArticles(): void {
      this.page = 1;
      this.isFavourite = true;
      this.isOwn = false;
      if (this.user) {
        this.getFavoritedArticles(50, 0, this.user.username);
      }
  }

  public getNewUser(): Observable<ResponseUser> {
      return this.userService.getLoggedUser()
  }
  
  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => { if (subscription) { subscription.unsubscribe() } })
  }
}
