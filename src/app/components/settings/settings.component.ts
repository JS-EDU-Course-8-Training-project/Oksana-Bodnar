
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user!: ResponseUser | null;
  public user$!: Subject<ResponseUser | null>;
  public newSettingsForm!: FormGroup;
  public newUserSet!: ResponseUser;
  public environment = environment;
  private subscriptionSettings$!: Subscription;
  private subscriptionUser$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(
    private userService: UserService) { }

  ngOnInit(): void {
    this.gettingUserData();
  }

  public generateForm(): FormGroup {
    return this.newSettingsForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
    });
  }

  public gettingUserData(): void {
    this.subscriptionUser$ = this.userService.getLoggedUser().subscribe((user) => {
      this.user = user;
      this.updareForm(this.user);
    });
    this.subscriptions$.push(this.subscriptionUser$);
    this.generateForm();
  }

  public updareForm(user: ResponseUser): void {
    this.newSettingsForm.patchValue({
      image: user.image,
      username: user.username,
      bio: user.bio,
      email: user.email,
    });
  }

  public publish(): void {
    if (this.user) {
      this.newUserSet = { ...this.newSettingsForm.value, token: this.user.token };
      this.subscriptionSettings$ = this.userService.postNewSettings(this.newUserSet).subscribe()
    }
    this.subscriptions$.push(this.subscriptionSettings$);
  }
  
  public doUserLogout(): void {
    this.userService.doLogout();
  }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => { if (subscription) { subscription.unsubscribe() } })
  }
}