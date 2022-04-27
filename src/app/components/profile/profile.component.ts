import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { ArticleResult } from 'src/app/shared/models/ArticleResult.model';
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
  public articles!: Articles[];
  public isLogged!: string | null;
  private subscriptionUser$!: Subscription;
  private subscriptionArticle$!: Subscription;
  private subscriptions$: Subscription[] = [];
  

  constructor(private httpService: GetArticleService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.isLogged = this.userService.getToken();
    this.articles$ = this.httpService.articles$;
   
    this.getArticles();
    
    this.subscriptionUser$ = this.getNewUser()
     .subscribe(data => {
        return this.user = data;
     });
    this.subscriptions$.push(this.subscriptionUser$);
  }

  public getArticles() {
     this.articles$ = this.httpService.articles$;
     this.subscriptionArticle$ = this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
    this.subscriptions$.push(this.subscriptionArticle$);
  }

  public showOwnArticles(): void { 
    this.isOwn = true;
    this.isFavourite = false;
  }

  public showFavouriteArticles(): void {
    this.isFavourite = true;
    this.isOwn = false;
  }

   public getNewUser() {
      return this.userService.getLoggedUser()
   }
  
  ngOnDestroy() {
   if(this.subscriptions$) {
        this.subscriptions$.forEach((subscription) => subscription.unsubscribe())
    }}
  
}
