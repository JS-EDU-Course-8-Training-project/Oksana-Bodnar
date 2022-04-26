import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, Observable, Subject, Subscription, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ChangeProfileType } from 'src/shared/models/newProfile.model';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  public user!: NewUser;
  public user$!: Subject<NewUser | null>;
  public newSettingsForm!: FormGroup;
  public newUserSet!: ChangeProfileType;
  public environment = environment;
  private subscriptionSettings$!: Subscription;
  private subscriptionUser$!: Subscription;
  

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // this.getNewUser();
    // this.generateForm();
    // this.subscriptionUser$ = this.userService.getLoggedUser().subscribe((user) => {
    //   this.user = user;
    //   this.updareForm(this.user);
    // });
    this.gettingUserData();
  }

  public generateForm() {
    return this.newSettingsForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

    public gettingUserData() {
    this.subscriptionUser$ = this.userService.getLoggedUser().subscribe((user) => {
          this.user = user;
          this.updareForm(this.user);
    });
    this.generateForm();
  }

  public updareForm(user: NewUser) {
    return this.newSettingsForm.patchValue({
      image: user.image,
      username: user.username,
      bio: user.bio,
      email: user.email,
    });
  }

    // public updareForm(user: NewUser) {
    // return this.newSettingsForm = new FormGroup({
    //   image: new FormControl(user.image),
    //   username: new FormControl(user.username),
    //   bio: new FormControl(user.bio),
    //   email: new FormControl(user.email),
    //   // password: new FormControl(''),
    // });
  // }
  
  public publish() {
    this.newUserSet = { ...this.newSettingsForm.value, token: this.user.token };
    console.log(this.newUserSet);
    return this.subscriptionSettings$ = this.postNewSettings(this.newUserSet).subscribe(
       {next: (data: any) => {
         console.log(data);
            },
            error: (error) => {
                console.log(error);
            }
          }
    );
    // this.router.navigate(['']);
  }

  public postNewSettings(newUserSet: ChangeProfileType): Observable<ChangeProfileType> {
    console.log({ user: newUserSet });
    return this.http.put<ChangeProfileType>(`${this.environment.url}/user`, { user: newUserSet })
      .pipe(map((response: ChangeProfileType) => {
        return response;
      })).pipe(catchError(this.handleError));
  }
  
  // public getNewUser() {
  //   return this.userService.getLoggedUser()
  // }
  
  public doUserLogout() {
    this.userService.doLogout();
  }

  public handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      console.log(msg);
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(msg);
    }
    return throwError(msg);
  }

  ngOnDestroy() {
    if (this.subscriptionSettings$) {
      this.subscriptionSettings$.unsubscribe();
    }
     if (this.subscriptionUser$) {
      this.subscriptionUser$.unsubscribe();
    }
  }
}