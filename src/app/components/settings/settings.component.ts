import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, throwError } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { ChangeProfileType } from 'src/shared/models/newProfile.model';
import { NewUser } from 'src/shared/models/newUser.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public user!: NewUser;
  public user$!: Subject<NewUser | null>;
  public newSettingsForm!: FormGroup;
  public newUserSet!: ChangeProfileType;
  public environment = environment;

  constructor(private userService: UserService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getNewUser();
    this.generateForm();
    this.userService.getLoggedUser().subscribe((user) => {
      this.user = user;
      this.updareForm(this.user);
    });
  }

  public generateForm() {
    return     this.newSettingsForm = new FormGroup({
      image: new FormControl(''),
      username: new FormControl(''),
      bio: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  public updareForm(user: NewUser) {
    return this.newSettingsForm.patchValue({
      image: user.image,
      username: user.username,
      bio: user.bio,
      email: user.email,
    });
  }
  
  public publish() {
    this.newUserSet =  { ...this.newSettingsForm.value, token: this.user.token };
    this.postNewSettings(this.newUserSet).subscribe();
    this.router.navigate(['']);
  }

  public postNewSettings(newUserSet: ChangeProfileType): Observable<ChangeProfileType> {
  return this.http.put<ChangeProfileType>(`${this.environment.url}/user`,  {user: newUserSet} )
  .pipe(map((response: any) => {
        return response;
      }))}
  
  public getNewUser() {
      return this.userService.getLoggedUser()}
  
  public doUserLogout() {
    this.userService.doLogout();}

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
}

 