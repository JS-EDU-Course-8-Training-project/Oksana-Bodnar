import { Component, OnInit } from '@angular/core';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/shared/models/articles.model';
import { NewUser } from 'src/shared/models/newUser.model';
import { Tags } from 'src/shared/models/tags.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [GetArticleService]
})
   
export class HomeComponent implements OnInit {

  constructor(private httpService: GetArticleService, private userService: UserService) { }
  public articles!: Articles[];
  public tags!: Tags[];
  public user!: NewUser;


 public getArticles() {
    this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
  }

 public getTags() {
    this.httpService
      .getTags()
      .subscribe(data => {
      this.tags = data;})
  }

  ngOnInit() {
    this.getArticles();
    this.getTags();
      
    this.getNewUser()
     .subscribe(data => {
        console.log(data);
        return this.user = data;
      });
  }

  public getNewUser() {
      return this.userService.getLoggedUser()
  }
  
  

}
