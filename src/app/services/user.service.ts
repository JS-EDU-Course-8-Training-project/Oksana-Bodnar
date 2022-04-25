import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewUser } from 'src/shared/models/newUser.model';
import { User } from 'src/shared/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  public environment = environment;
  public loggedUser!: NewUser;
  private userModels$: BehaviorSubject<User | any> = new BehaviorSubject(null);
  public loggedUserModels$: Subject <NewUser | null> = new Subject();
  

  constructor(private http: HttpClient, public router: Router) {}

  public setUser(username: string, email: string, password: string): void {
    this.userModels$.next({ username, email, password });
  }

  public register(user: any): Observable<NewUser> {
    return this.http.post<NewUser>(`${this.environment.url}/users`, user)
      .pipe(catchError(this.handleError))
  }

  public logUser(user: any): Observable<NewUser> {
    return this.http.post<NewUser>(`${this.environment.url}/users/login`, user)
    .pipe(catchError(this.handleError));
  }

 public getToken() {
    return localStorage.getItem('access_token');
  }
  
  public getLoggedUser() {
    return this.http.get<NewUser>(`${this.environment.url}/user`,)
      .pipe(map((res: any) => {
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
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      msg = error.error.message;
      console.log(msg);
    } else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log(msg);
    }
    return throwError(msg);
}
}

