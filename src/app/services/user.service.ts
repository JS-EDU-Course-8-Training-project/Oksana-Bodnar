import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { NewUser } from 'src/shared/models/newUser.model';
import { User } from 'src/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userModels$: BehaviorSubject<User | any> = new BehaviorSubject(null);

  constructor(private http: HttpClient, public router: Router) { }

  public setUser(username: string, email:string, password: string): void {
    this.userModels$.next({ username, email, password });
  }

  public getUser(): User | null {
    return this.userModels$.getValue();
  }

  public register(user: any): Observable<NewUser> {
    return this.http.post<NewUser>('https://api.realworld.io/api/users', user)
      .pipe(catchError(this.handleError));;
  }

  public logUser(user: any): Observable<NewUser> {
    return this.http.post<NewUser>('https://api.realworld.io/api/users/login', user)
    .pipe(catchError(this.handleError));
  }

 public getToken() {
    return localStorage.getItem('access_token');
  }

  public isLoggedIn(): boolean {
    return localStorage.getItem('access_token') ? true : false;
   }
  
  public getLoggedUser() {
    return this.http.get<NewUser>('https://api.realworld.io/api/user',)
    .pipe(map((res: any) => {
                  return res.user;
              })).pipe(catchError(this.handleError));
  }

  public doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken === null) {
        this.router.navigateByUrl('/login')
    }}
 
  public handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}

