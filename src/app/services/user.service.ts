import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export type User = {
    userName: string,
    email: string,
    password: string;
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userModels$: BehaviorSubject<User | any> = new BehaviorSubject(null);
  constructor() { }

  public setUser(userName: string, email:string, password: string): void {
    this.userModels$.next({ userName, email, password });
  }
    
 public logUser(email:string, password: string): void {
    this.userModels$.next({ email, password });
  }

  public getUser(): User | null {
    return this.userModels$.getValue();
  }
  

  public removeUser() {
    this.userModels$.next(null);
  }
}