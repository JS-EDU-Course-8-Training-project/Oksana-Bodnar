import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: any;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getNewUser();
  }

  getNewUser() {
    this.user = this.userService.getUser();
    console.log(this.user); 
    return this.user;
  }
  

}
