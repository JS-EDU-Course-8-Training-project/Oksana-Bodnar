import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { mustBePasswordValidator } from 'src/shared/mustBe-password.directive';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
 public newUser = {};
 public isLogged!: boolean;
  public authForm!: FormGroup; 

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

    this.userService.register(this.newUser)
        .subscribe(
          {next: (data: any) => {
            localStorage.setItem('access_token', data.user.token);
            this.router.navigateByUrl('/settings')
            console.log("User is logged in");
            this.isLogged = true},
            error: (err) => {console.log(err);}
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
}
