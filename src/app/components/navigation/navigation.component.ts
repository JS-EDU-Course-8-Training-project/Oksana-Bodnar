import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']

})
export class NavigationComponent implements OnInit{

  public isLoggedUser$!: Subject<NewUser | null>;
  public user!: NewUser;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedUser$ = this.userService.loggedUserModels$;


    if (this.userService.getToken()) {
      this.getNewUser()
        .subscribe()
    }}

  public doUserLogout() {
    this.userService.doLogout();
  }

  public getNewUser() {
      return this.userService.getLoggedUser()
    }
}
