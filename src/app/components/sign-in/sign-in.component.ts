import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

    public login(): void {
      console.log(this.authForm.getRawValue());
      this.userService.logUser(
        this.authForm.getRawValue().email,
        this.authForm.getRawValue().password);
      this.router.navigateByUrl('').catch(e => console.log(e))
  }

}
