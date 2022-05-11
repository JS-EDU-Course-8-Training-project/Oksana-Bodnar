import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ArticleComponent,
  ],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ArticleModule { }
