import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/app/shared/models/newUser.model';
import { mustBePasswordValidator } from 'src/app/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnDestroy, OnInit  {
  public newUser!: NewUser;
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
  this.newUser = this.authForm.value;
    this.subscriptionUser$ = this.userService.logUser({ user: this.newUser })
        .subscribe(
          {
            next: () => {
            // this.router.navigateByUrl('/settings')
          },
            error: (error) => {
                this.fieldError = error.fieldError;
                this.problemError = error.problemError;
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
