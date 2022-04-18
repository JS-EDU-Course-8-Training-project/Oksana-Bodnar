import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
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
    .pipe(catchError(this.handleError));;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

   isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }
 
    // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}