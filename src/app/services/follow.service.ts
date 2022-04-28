import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

public environment = environment;
  
  constructor(private http: HttpClient) { }

  public follow(name: string) {
      return this.http.post(`${this.environment.url}/profiles/${name}/follow`, {})
        .pipe(map(() => {
              }))
  }
  
  public unFollow(name: string) {
      return this.http.delete(`${this.environment.url}/profiles/${name}/follow`, {})
      .pipe(map(() => {
        }))
  }
  

}
