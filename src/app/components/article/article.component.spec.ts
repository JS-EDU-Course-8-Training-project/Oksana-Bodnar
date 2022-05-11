import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { FollowService } from 'src/app/services/follow.service';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/app/shared/models/articles.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';
import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {

  const draftArticles: { article: Articles } = {
    article: {
      slug: 'some-slug',
      title: 'some title',
      description: 'description',
      body: 'body',
      tagList: ['tag'],
      createdAt: 'data',
      updatedAt: 'data',
      favorited: true,
      favoritesCount: 0,
      author: {
        username: 'username',
        bio: 'bio',
        image: 'href',
        following: false
      }
    }
  };

  const article: Articles = {
    author: {
      bio: 'bio',
      following: true,
      image: 'image',
      username: 'username'
    },
    body: 'body',
    createdAt: 'createdAt',
    description: 'description',
    favorited: true,
    favoritesCount: 1,
    slug: 'slug',
    tagList: ['tag'],
    title: 'title',
    updatedAt: 'updatedAt'
  };

  const draftResUser: { user: ResponseUser } = {
    user: {
      email: 'email',
      token: 'token',
      username: 'username',
      bio: 'bio',
      image: 'href'
    }
  };
  
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  const articleServiceStub = jasmine.createSpyObj('GetArticleService', ['deleteArticle', 'getArticle']);
  const commentServiceStub = jasmine.createSpyObj('CommentsService', ['']);
  const userServiceStub = jasmine.createSpyObj('UserService', ['getNewUser', 'getToken', 'getLoggedUser']);
  const followServiceStub = jasmine.createSpyObj('FollowService', ['unFollow', 'follow']);

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
       imports: [
        HttpClientTestingModule,
      ],
        providers: [
          { provide: GetArticleService, useValue: articleServiceStub},
          { provide: CommentsService, useValue: commentServiceStub },
          { provide: UserService, useValue: userServiceStub },
          { provide: FollowService, useValue: followServiceStub },
          { provide: Router, useClass: RouterStub }
      ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
      fixture = TestBed.createComponent(ArticleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deleteCommentService should be called', () => {
      let spy = spyOn(component, 'deleteComment').and.callThrough();
      spy.calls.reset();
      component.deleteComment();
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('publishComment should be called', () => {
      let spy = spyOn(component, 'publishComment').and.callThrough();
      spy.calls.reset();
      component.publishComment();
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('onClickFollow should be called', () => {
      let spy = spyOn(component, 'onClickFollow').and.callThrough();
      spy.calls.reset();
      component.onClickFollow();
      expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('onClickLike should be called', () => {
      let spy = spyOn(component, 'onClickLike').and.callThrough();
      spy.calls.reset();
      component.onClickLike();
      expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('follow should be called', () => {
      let spy = spyOn(component, 'follow').and.callThrough();
      spy.calls.reset();
      component.follow();
      expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('unFollow should be called', () => {
      let spy = spyOn(component, 'unFollow').and.callThrough();
      spy.calls.reset();
      component.unFollow();
      expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('likeDelete should be called', () => {
      let spy = spyOn(component, 'likeDelete').and.callThrough();
      spy.calls.reset();
      component.likeDelete();
      expect(spy).toHaveBeenCalledTimes(1);
  });

  it('deleteArticle should have Subscription', () => {
      articleServiceStub.deleteArticle.and.returnValue(of(null))
      component.deleteArticle();
      const subscription = component.subscriptionDeleteArticle$ instanceof Subscription;
      expect(subscription).toBeTrue();
  });
  
  it('getArticle should have Subscription', () => {
      articleServiceStub.getArticle.and.returnValue(of(draftArticles))
      component.getArticle();
      const subscription = component.subscriptionArticle$ instanceof Subscription;
      expect(subscription).toBeTrue();
  });

  it('provideUser should have Subscription', () => {
      userServiceStub.getLoggedUser.and.returnValue(of(draftResUser))
      userServiceStub.getToken.and.returnValue(of('token'))
      component.provideUser();
      const subscription = component.subscriptionNewUser$ instanceof Subscription;
      expect(subscription).toBeTrue();
  });
});
