import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateAerticleService } from 'src/app/services/createArticle.service';
import { crateArticle } from 'src/shared/models/createArticle.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [CreateAerticleService]
})

  
export class EditorComponent implements OnInit {

  public newArticleForm!: FormGroup;
  newArticle!: crateArticle;
  constructor(private router: Router,
  private createArticleService: CreateAerticleService) { }

//   export interface crateArticle {
//     "title": "string";
//     "description": "string";
//     "body": "string";
//     "tagList": [
//         "string"
//     ];
// };

  ngOnInit(): void {
        this.newArticleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        body: new FormControl(''),
        tagList: new FormControl(['']),
    });
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

}
