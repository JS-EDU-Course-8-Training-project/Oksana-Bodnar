import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  providers: [GetArticleService]
})
export class ProfileComponent implements OnInit, OnDestroy {
  public isFavourite = false;
  public isOwn = true;
  public user!: NewUser;
  public articles$!: Subject<Articles[] | null>;
  public articles!: Articles[];
  public isLogged!: string | null;
  private subscriptionUser$!: Subscription;
  private subscriptionArticle$!: Subscription;
  

  constructor(private httpService: GetArticleService, private userService: UserService) { }
  
  ngOnInit(): void {
    this.isLogged = this.userService.getToken();
    this.articles$ = this.httpService.articles$;
   
    this.getArticles();
    
    this.subscriptionUser$ = this.getNewUser()
     .subscribe(data => {
        return this.user = data;
      });
  }

  public getArticles() {
     this.articles$ = this.httpService.articles$;
     this.subscriptionArticle$ = this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
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
    if (this.subscriptionUser$) {
      this.subscriptionUser$.unsubscribe();
    }
    if (this.subscriptionArticle$) {
      this.subscriptionArticle$.unsubscribe();
    }
    }
  
}
