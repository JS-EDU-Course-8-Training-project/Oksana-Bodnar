import { Component, OnInit } from '@angular/core';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GetArticleService]
})
   
export class HomeComponent implements OnInit {

  public articles!: Articles[];
  public articlesFeed!: Articles[];
  public tags!: Tags[];
  public isLogged!: boolean;
  public isOwnFeed = false;
  public isGlobal = true;

  constructor(private httpService: GetArticleService, private userService: UserService) { }


  ngOnInit() {
    this.isLogged = this.userService.isLoggedIn();
    this.getArticles();
    if (this.isLogged) { 
    this.getArticlesYourFeed()
  }
    this.getTags();
  }


 public getArticles() {
    this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
 }
  
public getArticlesYourFeed() {
    this.httpService
      .getArticlesFeed()
      .subscribe(data => {
      this.articlesFeed = data;
      })
  }

public getTags() {
    this.httpService
      .getTags()
      .subscribe(data => {
      this.tags = data;})
  }

public showYourFeed() {
    this.isOwnFeed = true;
    this.isGlobal = false;
  }

public showAllArticles() {
    this.isOwnFeed = false;
    this.isGlobal = true;
  }
}
