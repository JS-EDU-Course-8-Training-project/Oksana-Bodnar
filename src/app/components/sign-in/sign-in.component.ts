import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { mustBePasswordValidator } from 'src/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy, OnInit  {
  public newUser = {};
  public isLogged!: boolean;
  public authForm!: FormGroup;
  private subscriptionUser$!: Subscription;
  public fieldError!: string;
  public problemError!: string;

  constructor(private router: Router,
  private userService: UserService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), mustBePasswordValidator(/^(\S)(?=.*[0-9])(?=.*[A-Z])/i)]),
    });
  }

  public login(): void {
  this.newUser = {user: this.authForm.value};
     this.subscriptionUser$ = this.userService.logUser(this.newUser)
        .subscribe(
          {next: (data: any) => {
            localStorage.setItem('access_token', data.user.token);
            this.router.navigateByUrl('/settings')
            },
            error: (error) => {
                this.fieldError = Object.keys(error.error.errors).join(',');
                this.problemError = Object.values(error.error.errors).join(',');
                console.log(this.fieldError);
                console.log(this.problemError);
            }
          }); 
    }
  
   // creation data for validation
  public get userEmail() {
   return this.authForm.get('email');
  } 

  public get userPassword() {
   return this.authForm.get('password');
  } 
  
  ngOnDestroy() {
    if (this.subscriptionUser$) {
      this.subscriptionUser$.unsubscribe();
    }
  }

}
