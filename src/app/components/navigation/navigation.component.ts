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


  public doUserLogout() {
    this.userService.doLogout();
  }

  ngOnInit(): void {
    this.isLogged = this.userService.isLoggedIn();
    this.doUserLogout;
  }

}
