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
  toSubmit = true;
  newUser = {};

  constructor(private router: Router,
    private userService: UserService) { }
  public authForm!: FormGroup;

   // RF creation
  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]),
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8),mustBePasswordValidator(/^(\S)(?=.*[0-9])(?=.*[A-Z])/i)]),
    })
  }

  // User registration 
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
          {next: (data) => {
              this.router.navigateByUrl('');
              console.log("User is registered in")
            },
            error: (err) => {console.log(err);
            this.toSubmit = false;
            }
          }); 
  }
    
  
 // creation data for validation
  get username() {
   return this.authForm.get('username');
  } 
  get userEmail() {
   return this.authForm.get('email');
  } 
  get userPassword() {
   return this.authForm.get('password');
  }
}
