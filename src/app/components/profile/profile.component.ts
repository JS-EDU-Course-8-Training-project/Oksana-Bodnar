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
  public isOwn = true;
  public user!: ResponseUser;
  public articles$!: BehaviorSubject<Articles[]>
  public isLogged!: string | null;
  public page = 1;
  public count = 0;
  public pageSize = 3;
  public noArticle = false;
  private subscriptionUser$!: Subscription;
  private subscriptionArticle$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(private httpService: GetArticleService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.isLogged = this.userService.getToken();
    
    this.subscriptionUser$ = this.getNewUser().subscribe(data => {
        return this.user = data;
     });
    this.subscriptions$.push(this.subscriptionUser$);
  }

  handlePageChange(event: number): void {
    this.page = event;
  }

  public getArticles(): void {
    this.articles$ = this.httpService.articles$;
    if (this.articles$) {
      this.noArticle = false;
    }
    this.subscriptionArticle$ = this.httpService.getAllArticles(20, 0).subscribe()
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public getFavoritedArticles(): void {
    this.articles$ = this.httpService.articles$;
    if (this.articles$) {
      this.noArticle = false;
    }
    if (this.user) {
      this.subscriptionArticle$ = this.httpService.getAllFavoritedArticles(20, 0, this.user.username)
        .subscribe()
    }
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public showOwnArticles(): void { 
    this.page = 1;
    this.isOwn = true;
    this.isFavourite = false;
     this.getArticles();
  }

  public showFavouriteArticles(): void {
      this.page = 1;
      this.isFavourite = true;
      this.isOwn = false;
      this.getFavoritedArticles();
  }

   public getNewUser(): Observable<ResponseUser> {
      return this.userService.getLoggedUser()
   }
  
  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => { if (subscription) { subscription.unsubscribe() } })
  }
}
