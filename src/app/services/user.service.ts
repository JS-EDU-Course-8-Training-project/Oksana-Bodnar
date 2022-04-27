import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';
import { NewUser } from 'src/app/shared/models/newUser.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public environment = environment;
  public loggedUser!: ResponseUser;
  private userModels$: BehaviorSubject<NewUser> = new BehaviorSubject({} as NewUser);
  public loggedUserModels$: Subject <ResponseUser | null> = new Subject();
  

  constructor(private http: HttpClient, public router: Router) {}

  public setUser(username: string, email: string, password: string): void {
    this.userModels$.next({ username, email, password });
  }

  public register(user: { user: NewUser }) {
    return this.http.post<{ user: ResponseUser }>(`${this.environment.url}/users`, user)
        .pipe(map((res: {user: ResponseUser}) => {
          console.log(res.user.token);
          localStorage.setItem('access_token', res.user.token);
  })).pipe(catchError(this.handleError));
  }

  public logUser(user: { user: NewUser }) {
    return this.http.post<{ user: ResponseUser }>(`${this.environment.url}/users/login`, user)
        .pipe(map((res: {user: ResponseUser}) => {
          console.log(res.user.token);
          localStorage.setItem('access_token', res.user.token);
  })).pipe(catchError(this.handleError));
  }

 public getToken() {
    return localStorage.getItem('access_token');
  }
  
  public getLoggedUser(): Observable<ResponseUser> {
    return this.http.get<{user: ResponseUser}>(`${this.environment.url}/user`)
      .pipe(map((res: {user: ResponseUser}) => {
        this.loggedUser = res.user;
        this.loggedUserModels$.next(res.user);
        return this.loggedUser;
  })).pipe(catchError(this.handleError));
  }

  public doLogout() {
    localStorage.removeItem('access_token');
    this.loggedUserModels$.next(null);
    this.router.navigateByUrl('/login')
}
 
  public handleError(error: HttpErrorResponse) {
    let msg: string;
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      console.log(msg);
    } else {
    console.log(error.error);
    }
    return throwError(error);
}
}

