import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
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
  private subscriptionUser$!: Subscription;
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedUser$ = this.userService.loggedUserModels$;

    if (this.userService.getToken()) {
     this.subscriptionUser$ = this.getNewUser()
        .subscribe()
    }}

  public doUserLogout() {
    this.userService.doLogout();
  }

  public getNewUser() {
      return this.userService.getLoggedUser()
  }
  
  ngOnDestroy() {
    if (this.subscriptionUser$) {
      this.subscriptionUser$.unsubscribe();
    }
    }
}
