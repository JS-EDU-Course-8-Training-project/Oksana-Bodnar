import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent  {

  constructor(private router: Router,
  private userService: UserService) { }

  public authForm!: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.email,Validators.required]),
      password: new FormControl('', [Validators.required,Validators.minLength(8)]),
    })
  }

    public login(): void {
      console.log(this.authForm.getRawValue());
      this.userService.logUser(
        this.authForm.getRawValue().email,
        this.authForm.getRawValue().password);
      this.router.navigateByUrl('').catch(e => console.log(e))
  }
 // for validation
  get userEmail() {
   return this.authForm.get('email');
  } 
  get userPassword() {
   return this.authForm.get('password');
} 


}
