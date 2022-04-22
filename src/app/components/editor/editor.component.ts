import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CreateAerticleService } from 'src/app/services/createArticle.service';
import { environment } from 'src/environments/environment';
import { Articles } from 'src/shared/models/articles.model';
import { crateArticle } from 'src/shared/models/createArticle.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [CreateAerticleService]
})

  
export class EditorComponent implements OnInit {

  public newArticleForm!: FormGroup;
  public newArticle!: crateArticle;
  public slug!: string | null;
  public environment = environment;
   public article!: Articles;

  constructor(private router: Router, private createArticleService: CreateAerticleService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {

    this.getSlug();
    if (this.slug) {
      this.getArticle().subscribe(data => {
        this.article = data;

        this.newArticleForm = new FormGroup({
        title: new FormControl(this.article.title),
        description: new FormControl(this.article.description),
        body: new FormControl(this.article.body),
        tagList: new FormControl(this.article.tagList),
      });
        
      });
    }
    
      
    
      this.newArticleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        body: new FormControl(''),
        tagList: new FormControl(['']),
      });
    

  }
  
  public getSlug() {
       this.route.paramMap.subscribe( paramMap => {
        this.slug = paramMap.get('slug');
    })
  }

  public update() {
     this.newArticle = this.newArticleForm.value
    console.log(this.newArticle);
      this.postNewArticle(this.newArticle)
        .subscribe(
          {next: (data: any) => {
            this.router.navigateByUrl('')
            console.log("Article Published!")},
            error: (err) => {console.log(err);}
          }); 
  }

public postNewArticle(article: crateArticle): Observable<Articles> {
    return this.http.put<Articles>(`${this.environment.url}/articles/${this.slug}`, { article })
    .pipe(catchError(this.handleError));
}

public getArticle(): Observable<Articles> {
      return this.http.get<Articles>(`${this.environment.url}/articles/${this.slug}`, {})
          .pipe(map((res: any) => {
                  return res.article;
              })).pipe(catchError(this.handleError));
}

  public publish(): void {
    this.newArticle = this.newArticleForm.value
    console.log(this.newArticle);
      this.createArticleService.postArticle(this.newArticle)
        .subscribe(
          {next: (data: any) => {
            this.router.navigateByUrl('')
            console.log("Article Published!")},
            error: (err) => {console.log(err);}
          }); 
  }
  
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
