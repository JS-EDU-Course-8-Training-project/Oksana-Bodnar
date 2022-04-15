import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  getAllArticles(): Observable<Articles[]> {
      return this.http.get<Articles[]>('https://api.realworld.io/api/articles')
          .pipe(map((res: any) => {
                  return res.articles;
              }))
  }

  getTags(): Observable<Tags[]> {
      return this.http.get<Tags[]>('https://api.realworld.io/api/tags')
          .pipe(map((res: any) => {
                  return res.tags;
              }))
  }

}
