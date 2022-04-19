import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public isLogged!: boolean;
  constructor(private userService: UserService) { }


  // do User Log out
  doUserLogout() {
    this.userService.doLogout();
  }

   // check if user is logged in
  ngOnInit(): void {
    this.isLogged = this.userService.isLoggedIn();
    this.doUserLogout;
  }

}
