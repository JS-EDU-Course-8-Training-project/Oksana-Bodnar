import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Articles } from 'src/shared/models/articles.model';
import { Comments } from 'src/shared/models/comments.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  public href!: string;
  public slug!: string;
  public article!: Articles;
  public comments!: Comments[];
  

  getSlug() {
     this.href = this.router.url.split('/').slice(-1).toString();
  }

  getArticle(): Observable<Articles> {
      return this.http.get<Articles>(`https://api.realworld.io/api/articles/${this.href}`)
          .pipe(map((res: any) => {
                  return res.article;
              }))
  }

  getComments(): Observable<Comments[]> {
      return this.http.get<Comments[]>(`https://api.realworld.io/api/articles/${this.href}/comments`)
          .pipe(map((res: any) => {
                  return res.comments;
              }))
  }

  ngOnInit(): void {
    this.getSlug();
    this.getArticle().subscribe(data => {
      this.article = data;
    });
    this.getComments().subscribe(data => {
      this.comments = data;
    });

  }

}
