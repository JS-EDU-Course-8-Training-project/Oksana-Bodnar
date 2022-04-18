import { Component, OnInit } from '@angular/core';
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

  // get all articles from api
  getArticles() {
    this.httpService
      .getAllArticles()
      .subscribe(data => {
      this.articles = data;
      })
  }

  // get all tags from api
  getTags() {
    this.httpService
      .getTags()
      .subscribe(data => {
      this.tags = data;})
  }

  // invoking fns for getting needed data
  ngOnInit() {
    this.getArticles();
    this.getTags();
  }

}
