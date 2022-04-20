import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user!: NewUser;
  isLogged!: boolean;

  constructor(private userService: UserService) { }
  
  public getNewUser() {
      return this.userService.getLoggedUser()
    }
  
  public doUserLogout() {
    this.userService.doLogout();
  }

  ngOnInit(): void {
    this.getNewUser()
      .subscribe(data => {
        console.log(data);
        return this.user = data;
      });
  }
}

 