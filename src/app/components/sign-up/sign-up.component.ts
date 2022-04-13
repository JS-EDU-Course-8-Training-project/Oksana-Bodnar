import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

   constructor(private router: Router,
  private userService: UserService) { }

  public authForm!: FormGroup;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      userName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    })
  }

    public login(): void {
      console.log(this.authForm.getRawValue());
      this.userService.setUser(
        this.authForm.getRawValue().userName,
        this.authForm.getRawValue().email,
        this.authForm.getRawValue().password);
      this.router.navigateByUrl('').catch(e => console.log(e))
  }

}
