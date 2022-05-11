import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { navItem } from 'src/app/shared/models/navItem.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit{

  public isLoggedUser!: ResponseUser | null;
  public token!: string | null;
  public subscriptionUser$!: Subscription;
  public itemsLogged!: navItem[];
  public itemsNotLogged!: navItem[];
  
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.token = this.userService.getToken();
    if (this.token) {
      this.subscriptionUser$ = this.userService.loggedUserModels$.subscribe(val => {
        this.isLoggedUser = val;
      });
    }
    
    this.makeItems();
    this.userService.getLoggedUser().subscribe();
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

  ngOnDestroy() {
   if(this.subscriptionUser$) {this.subscriptionUser$.unsubscribe()}
  }
}
