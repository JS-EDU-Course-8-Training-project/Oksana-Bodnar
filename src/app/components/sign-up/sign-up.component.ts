import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { mustBePasswordValidator } from 'src/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
 public newUser = {};
 public isLogged!: boolean;
 public authForm!: FormGroup; 
 private subscriptionUser$!: Subscription;
 public fieldError!: string;
 public problemError!: string;

  constructor(private router: Router, private userService: UserService) { }
 

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8),mustBePasswordValidator(/^(\S)(?=.*[0-9])(?=.*[A-Z])/i)]),
    })
  }

  public login(): void {
      console.log(this.authForm.getRawValue());
      this.userService.setUser(
        this.authForm.getRawValue().username,
        this.authForm.getRawValue().email,
        this.authForm.getRawValue().password);
      
    this.newUser = {
        user: this.authForm.value
      };

  this.subscriptionUser$ = this.userService.register(this.newUser)
        .subscribe(
          {next: (data: any) => {
            localStorage.setItem('access_token', data.user.token);
            this.router.navigateByUrl('/settings')
            this.isLogged = true;
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
  public get username() {
   return this.authForm.get('username');
  } 
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
