import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
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

export class HomeComponent implements OnInit {

  public articles$!: BehaviorSubject<Articles[] | null>;
  public articlesFeed$!: Subject<Articles[] | null>;
  public tags$!: Subject<Tags[] | null>;
  public isLogged$!: Subject<NewUser | null>;
  public token!: string | null;
  public isOwnFeed = false;
  public isGlobal = true;
  public input!: 'default';

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
    this.httpService
      .getAllArticles()
      .subscribe();
  }
  
  public getToken() {
     return this.userService
       .getToken();
 }
  
  public getArticlesYourFeed() {
    this.articlesFeed$ = this.httpService.articlesFeed$;
    this.httpService
      .getArticlesFeed()
      .subscribe();
  }

  public getTags() {
    this.httpService
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
  
  public showTag(event: DOMEvent<HTMLInputElement> | any) {
     this.input = event.target.innerText;
  };
}
