import { Component, OnInit } from '@angular/core';
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
export class ProfileComponent implements OnInit {
  public isFavourite = false;
  public isOwn = false;
  public user!: NewUser;

public articles!: Articles[];
  constructor(private httpService: GetArticleService, private userService: UserService) { }

   public getArticles() {
    this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
  }
  ngOnInit(): void {
    this.getArticles();
    
    this.getNewUser()
     .subscribe(data => {
        console.log(data);
        return this.user = data;
      });
  }

  public showOwnArticles(): void { 
    this.isOwn = true;
    this.isFavourite = false;
    
  };
  public showFavouriteArticles(): void {
    this.isFavourite = true;
    this.isOwn = false;
   };

   public getNewUser() {
      return this.userService.getLoggedUser()
    }
  
}
