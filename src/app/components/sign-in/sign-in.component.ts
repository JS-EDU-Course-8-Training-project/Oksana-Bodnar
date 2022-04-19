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
  newUser = {};
  toSubmit = true;
  isLogged!: boolean;

  constructor(private router: Router,
  private userService: UserService) { }

  public authForm!: FormGroup;

   // RF creation
  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), mustBePasswordValidator(/^(\S)(?=.*[0-9])(?=.*[A-Z])/i)]),
    });
    
  }

    // User loggining, setting local storage with JWT token 
    login(): void {
        this.newUser = {
        user: this.authForm.value
      };
      this.userService.logUser(this.newUser)
        .subscribe(
          {next: (data: any) => {
            localStorage.setItem('access_token', data.user.token);
            this.router.navigateByUrl('/settings')
              .then(() => {
            window.location.reload();
            });
            console.log("User is logged in");
            this.isLogged = true;
             
            },
            error: (err) => {console.log(err);
            }
          }); 
    }
  
 // creation data for validation
  get userEmail() {
   return this.authForm.get('email');
  } 
  get userPassword() {
   return this.authForm.get('password');
} 

}
