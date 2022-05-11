import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { LikeButtonComponent } from './like-button/like-button.component';

@NgModule({
  declarations: [
    HomeComponent,
    LikeButtonComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgxPaginationModule
  ]
})
export class HomeModule { }
