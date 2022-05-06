import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  public environment = environment;
  
  constructor(private http: HttpClient) { }

  public like(href: string): Observable<Object> {
    return this.http.post(`${this.environment.url}/articles/${href}/favorite`, {})
  }

  public likeDelete(href: string): Observable<Object> {
    return this.http.delete(`${this.environment.url}/articles/${href}/favorite`, {})
  }
}
