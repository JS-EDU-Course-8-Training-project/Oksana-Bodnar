import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { mustBePasswordValidator } from 'src/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  {
  public newUser = {};
  public isLogged!: boolean;
  public authForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), mustBePasswordValidator(/^(\S)(?=.*[0-9])(?=.*[A-Z])/i)]),
    });
    
  }

  public login(): void {
        this.newUser = {
        user: this.authForm.value
      };
      this.userService.logUser(this.newUser)
        .subscribe(
          {next: (data: any) => {
            localStorage.setItem('access_token', data.user.token);
            this.userService.setLoggedUser(localStorage.getItem('access_token'));
            this.router.navigateByUrl('/settings')
            console.log("User is logged in");
            },
            error: (err) => {console.log(err);}
          }); 
    }
  
   // creation data for validation
  public get userEmail() {
   return this.authForm.get('email');
  } 

  public get userPassword() {
   return this.authForm.get('password');
} 

}
