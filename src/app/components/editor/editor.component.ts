
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { environment } from 'src/environments/environment';
import { Articles } from 'src/app/shared/models/articles.model';
import { crateArticle } from 'src/app/shared/models/createArticle.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [ GetArticleService]
})

  
export class EditorComponent implements OnInit, OnDestroy {

  public newArticleForm!: FormGroup;
  public newArticle!: crateArticle;
  public slug!: string | null;
  public environment = environment;
  public article!: Articles;
  private subscriptionArticle$!: Subscription;
  private subscriptionUpdateArticle$!: Subscription;
  private subscriptionPublishArticle$!: Subscription;
  
  

  constructor(private router: Router,
    private route: ActivatedRoute,
    private getArticleService: GetArticleService) { }

  ngOnInit(): void {
    this.getSlug();
    this.gettingArticleData();
  }
  
  public getSlug() {
       this.route.paramMap.subscribe( paramMap => {
        this.slug = paramMap.get('slug');
    })
  }

  public gettingArticleData() {
    if (this.slug) {
     this.subscriptionArticle$ = this.getArticleService.getArticle(this.slug).subscribe(data => {
        this.article = data;
        this.generateForm(this.article);
       })}
    this.updateForm();
  }

  public generateForm(article: Articles) {
    return this.newArticleForm = new FormGroup({
        title: new FormControl(article.title),
        description: new FormControl(article.description),
        body: new FormControl(article.body),
        tagList: new FormControl(article.tagList),
      })
  }

  public updateForm() {
      return  this.newArticleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        body: new FormControl(''),
        tagList: new FormControl(''),
      });
  }

  public update() {
    if (this.newArticleForm.value.tagList.length) {
      this.newArticle = { ... this.newArticleForm.value, tagList: this.newArticleForm.value.tagList.split(',') };
    } else {
      this.newArticle = { ... this.newArticleForm.value };
    }
     this.subscriptionUpdateArticle$ = this.getArticleService.postUpdatedArticle(this.newArticle, this.slug)
       .subscribe((val) => {
         this.router.navigateByUrl('')
       }); 
    
  }

  public publish(): void {
     if (this.newArticleForm.value.tagList.length) {
      this.newArticle = { ... this.newArticleForm.value, tagList: this.newArticleForm.value.tagList.split(',') };
    } else {
      this.newArticle = { ... this.newArticleForm.value };
     }
     this.subscriptionPublishArticle$ = this.getArticleService.postArticle(this.newArticle)
       .subscribe((val) => {
         console.log(val.slug);
         this.router.navigateByUrl('')
       })
  }
  
  ngOnDestroy() {
    if (this.subscriptionArticle$) {
      this.subscriptionArticle$.unsubscribe();
    }
    if (this.subscriptionUpdateArticle$) {
      this.subscriptionUpdateArticle$.unsubscribe();
    }
    if (this.subscriptionPublishArticle$) {
      this.subscriptionPublishArticle$.unsubscribe();
    }

    }

}
