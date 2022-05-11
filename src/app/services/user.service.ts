import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of, Subject, Subscription } from 'rxjs';
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
  public loggedUserModels$: Subject<ResponseUser | null> = new Subject();
  public token!: string | null;
  
  constructor(private http: HttpClient, public router: Router) {}

  public setUser(username: string, email: string, password: string): void {
    this.userModels$.next({ username, email, password });
  }

  public register(user: { user: NewUser }): Observable<ResponseUser> {
    return this.http.post<{ user: ResponseUser }>(`${this.environment.url}/users`, user)
      .pipe(map((res: { user: ResponseUser }) => {
        this.router.navigateByUrl('/settings');
        localStorage.setItem('access_token', res.user.token);
        return res.user;
      }))
  }

  public logUser(user: { user: NewUser }): Observable<ResponseUser> {
    return this.http.post<{ user: ResponseUser }>(`${this.environment.url}/users/login`, user)
      .pipe(map((res: { user: ResponseUser }) => {
        this.router.navigateByUrl('/settings');
        localStorage.setItem('access_token', res.user.token);
        return res.user;
      }))
  }

  public getToken() {
    this.token = localStorage.getItem('access_token');
    return this.token;
  }
  
  public getLoggedUser(): Observable<ResponseUser> {
    return this.http.get<{user: ResponseUser}>(`${this.environment.url}/user`)
      .pipe(map((res: {user: ResponseUser}) => {
        this.loggedUser = res.user;
        this.loggedUserModels$.next(res.user);
        return this.loggedUser;
      }))
  }

  public doLogout(): void {
    localStorage.removeItem('access_token');
    this.loggedUserModels$.next(null);
    this.router.navigateByUrl('/login')
  }
  
  public postNewSettings(newUserSet: ResponseUser) {
    return this.http.put<{user: ResponseUser }>(`${this.environment.url}/user`, { user: newUserSet })
      .pipe(map((response: { user: ResponseUser }) => {
        localStorage.setItem('access_token', response.user.token);
        this.router.navigateByUrl(`profile/${response.user.username}`);
      }))
  }
}
