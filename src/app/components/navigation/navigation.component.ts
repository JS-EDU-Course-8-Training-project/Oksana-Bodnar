import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit {
  public isLogged!: boolean;
  public user!: NewUser;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLoggedIn();

    this.doUserLogout;

    this.getNewUser()
    .subscribe(data => {
    console.log(data);
    return this.user = data;
    });
  }


public doUserLogout() {
    this.userService.doLogout();
  }

public getNewUser() {
      return this.userService.getLoggedUser()
  }



}
