import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { NewUser } from 'src/app/shared/models/newUser.model';
import { mustBePasswordValidator } from 'src/app/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
 public newUser!: NewUser;
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
    this.userService.setUser(
        this.authForm.getRawValue().username,
        this.authForm.getRawValue().email,
        this.authForm.getRawValue().password
    );

    this.newUser = this.authForm.value;

    this.subscriptionUser$ = this.userService.register({user: this.newUser })
      .subscribe({next: () => {},
            error: (error) => {
                this.fieldError = error.fieldError;
                this.problemError = error.problemError;
        }
      })
  }
  
  public get username(): AbstractControl | null {
   return this.authForm.get('username');
  } 

  public get userEmail(): AbstractControl | null {
   return this.authForm.get('email');
  } 
  
  public get userPassword(): AbstractControl | null {
   return this.authForm.get('password');
  }

  ngOnDestroy() {
    if (this.subscriptionUser$) {this.subscriptionUser$.unsubscribe()}
  }
}
