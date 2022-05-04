import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subject, Subscription, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ChangeProfileType } from 'src/app/shared/models/newProfile.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user!: ResponseUser;
  public user$!: Subject<ResponseUser | null>;
  public newSettingsForm!: FormGroup;
  public newUserSet!: ChangeProfileType;
  public environment = environment;
  private subscriptionSettings$!: Subscription;
  private subscriptionUser$!: Subscription;
  private subscriptions$: Subscription[] = [];
  

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.gettingUserData();
  }

  public generateForm() {
    return this.newSettingsForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
    });
  }

    public gettingUserData() {
    this.subscriptionUser$ = this.userService.getLoggedUser().subscribe((user) => {
          this.user = user;
          this.updareForm(this.user);
    });
    this.subscriptions$.push(this.subscriptionUser$);
    this.generateForm();
  }

  public updareForm(user: ResponseUser) {
    return this.newSettingsForm.patchValue({
      image: user.image,
      username: user.username,
      bio: user.bio,
      email: user.email,
    });
  }

  public publish() {
    if (this.user) {
      this.newUserSet = { ...this.newSettingsForm.value, token: this.user.token };
      this.subscriptionSettings$ = this.userService.postNewSettings(this.newUserSet).subscribe()
    }
    this.subscriptions$.push(this.subscriptionSettings$);
  }
  
  public doUserLogout() {
    this.userService.doLogout();
  }


  ngOnDestroy() {

        this.subscriptions$.forEach((subscription) => {if (subscription) { subscription.unsubscribe() } })
  }
}