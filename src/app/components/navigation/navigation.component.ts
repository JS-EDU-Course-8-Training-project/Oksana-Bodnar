import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { navItem } from 'src/app/shared/models/navItem.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  public isLoggedUser$!: Subject<ResponseUser | null>;
  private subscriptionUser$!: Subscription;
  public itemsLogged!: navItem[];
  public itemsNotLogged!: navItem[];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedUser$ = this.userService.loggedUserModels$;
    this.makeItems();
    if (this.userService.getToken()) {
      this.subscriptionUser$ = this.getNewUser().subscribe()
    }   
  }
  
  public makeItems(): void {
      this.itemsLogged = [
        {url: '/editor', name: 'New Article'},
        {url: '/settings', name: 'Settings'},
      ]
      this.itemsNotLogged = [
        {url: '/login', name: 'Sign In'},
        {url: '/register', name: 'Sign Up'},
      ]
  }

  public doUserLogout(): void {
    this.userService.doLogout();
  }

  public getNewUser(): Observable<ResponseUser> {
    return this.userService.getLoggedUser()
  }
  
  ngOnDestroy() {
   if(this.subscriptionUser$) {this.subscriptionUser$.unsubscribe()}
  }
}
