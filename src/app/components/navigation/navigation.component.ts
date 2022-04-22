import { Component, DoCheck, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit, DoCheck {
  public isLogged!: boolean;
  public user!: NewUser;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {


    this.getNewUser()
      .subscribe(data => {
        console.log(data.username);
        return this.user = data;
      });
  
  }

  ngDoCheck(): void {
    //  this.isLogged = this.userService.isLoggedIn();
    this.isLogged = this.getIfLoggedUser() ? true : false;
  }


public doUserLogout() {
    this.userService.doLogout();
  }

 public getNewUser() {
      return this.userService.getLoggedUser()
    }

  public getIfLoggedUser() {
    return this.userService.getLogUser();
  }


}
