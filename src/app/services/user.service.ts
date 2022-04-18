import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NewUser } from 'src/shared/models/newUser.model';
import { User } from 'src/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userModels$: BehaviorSubject<User | any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) { }

  public setUser(username: string, email:string, password: string): void {
    this.userModels$.next({ username, email, password });
  }

  public getUser(): User | null {
    return this.userModels$.getValue();
  }

  public register(user: any): Observable<NewUser> {
    return this.http.post<NewUser>('https://api.realworld.io/api/users',  user );
  }

  public logUser(user: any): Observable<NewUser> {
    return this.http.post<NewUser>('https://api.realworld.io/api/users/login',  user );
  }

  public removeUser() {
    this.userModels$.next(null);
  }
}