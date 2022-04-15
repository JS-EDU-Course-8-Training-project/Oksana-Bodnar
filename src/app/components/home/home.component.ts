import { Component, Inject, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/getArticles.service';
import { Articles } from 'src/shared/models/articles.model';
import { Tags } from 'src/shared/models/tags.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HttpService]
})
   
export class HomeComponent implements OnInit {

  constructor(private httpService: HttpService) { }
  public articles!: Articles[];
  public tags!: Tags[];

  getArticles() {
    this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
  }

  getTags() {
    this.httpService
      .getTags()
      .subscribe(data => {
      this.tags = data;
      })
  }

  ngOnInit() {
    this.getArticles();
    this.getTags();
  }

}
