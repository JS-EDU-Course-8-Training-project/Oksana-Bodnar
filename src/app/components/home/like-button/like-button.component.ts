import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { LikeService } from 'src/app/services/like.service';
import { Articles } from 'src/app/shared/models/articles.model';

@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
  providers: [GetArticleService]
})
export class LikeButtonComponent implements OnInit, OnDestroy {
    @Input() count!: string;
    @Output() countChanged: EventEmitter<string> = new EventEmitter();
    @Input() slug!: string;
    @Output() slugChanged: EventEmitter<string> = new EventEmitter();
  
  public isLike!: boolean;
  public likeCounterMessage!: string;
  public likeCounter!: number;
  public article!: Articles;
  public resArticle: any;
  private subscriptionArticle$!: Subscription;
  public subscriptionLike$!: Subscription;
  public subscriptionDeleteLike$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(
  private getArticleService: GetArticleService,
  private likeService: LikeService) { }

  ngOnInit(): void {
  }

  public onClickLike(event: string): void {
    this.subscriptionArticle$ = this.getArticleService.getArticle(event).subscribe(data => {
      this.isLike = data.favorited;
      this.likeCounter = data.favoritesCount;
      this.article = data;
      this.isLike = !this.isLike;
      this.isLike ? this.like(event) : this.likeDelete(event);
    });
  }

  public like(href: string): void {
    this.subscriptionLike$ = this.likeService.like(href)
      .subscribe((val) => {
        this.count = '+1'; this.likeCounter += 1; this.likeCounterMessage = `Total: ${this.likeCounter}`;
        this.resArticle = val
      });
    this.subscriptions$.push(this.subscriptionLike$);
  }

  public likeDelete(href: string): void {
    this.subscriptionDeleteLike$ = this.likeService.likeDelete(href)
      .subscribe((val) => {
        this.count = '-1'; this.likeCounter -= 1; this.likeCounterMessage = `Total: ${this.likeCounter}`;
        this.resArticle = val
      }); 
    this.subscriptions$.push(this.subscriptionDeleteLike$);
  }

  public counter() {
      this.countChanged.emit(this.count);
  }

  public getSlug() {
    this.slug;
    this.slugChanged.emit(this.slug);
    }

  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {if (subscription) { subscription.unsubscribe() } })
  }
}
