import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription } from 'rxjs';
import { CommentsService } from 'src/app/services/comments.service';
import { FollowService } from 'src/app/services/follow.service';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { UserService } from 'src/app/services/user.service';
import { Articles } from 'src/app/shared/models/articles.model';
import { Comments } from 'src/app/shared/models/comments.model';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

    const draftComments: Comments[] = [{
      id: 1,
      createdAt: 'some date',
      updatedAt: 'some date',
      body: 'some body',
      author: {
        username: 'some name',
        bio: 'some bio',
        image: 'some href image',
        following: true,
      }
    }, {
      id: 2,
      createdAt: 'some date',
      updatedAt: 'some date',
      body: 'some body',
      author: {
        username: 'some name',
        bio: 'some bio',
        image: 'some href image',
        following: false,
      }
      }];
  
  const draftArticles: { article: Articles } = {
    article:
    {
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

      const profile = {
    profile: {
      bio: 'bio',
      following: true,
      image: 'image',
      username: 'username'
    }
  }
  

  const draftResUser: { user: ResponseUser } = {
    user: {
      email: 'email',
      token: 'token',
      username: 'username',
      bio: 'bio',
      image: 'href'
    }
  };
  
  const articleServiceStub = jasmine.createSpyObj('GetArticleService', ['deleteArticle', 'getArticle']);
  const commentServiceStub = jasmine.createSpyObj('CommentsService', ['']);
  const userServiceStub = jasmine.createSpyObj('UserService', ['getNewUser', 'getToken', 'getLoggedUser']);
  const followServiceStub = jasmine.createSpyObj('FollowService', ['unFollow', 'follow']);

articleServiceStub.getArticle.and.returnValue(of(article))

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
       imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
        providers: [
          { provide: GetArticleService, useValue: articleServiceStub},
          { provide: CommentsService, useValue: commentServiceStub },
          { provide: UserService, useValue: userServiceStub },
          { provide: FollowService, useValue: followServiceStub },
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
      expect(spy).toHaveBeenCalled();
    

  });

    it('publishComment should be called', () => {
      let spy = spyOn(component, 'publishComment').and.callThrough();
      spy.calls.reset();
      component.publishComment();

      expect(spy).toHaveBeenCalled();
    });

    it('onClickFollow should be called', () => {
      let spy = spyOn(component, 'onClickFollow').and.callThrough();
      spy.calls.reset();
      component.onClickFollow();

      expect(spy).toHaveBeenCalled();
    });
  
    it('onClickLike should be called', () => {
      let spy = spyOn(component, 'onClickLike').and.callThrough();
      spy.calls.reset();
      component.onClickLike();

      expect(spy).toHaveBeenCalled();
    });
  
     it('follow should be called', () => {
       let spy = spyOn(component, 'follow').and.callThrough();
       spy.calls.reset();
      component.follow();

       expect(spy).toHaveBeenCalled();

     });
  
     it('unFollow should be called', () => {
       let spy = spyOn(component, 'unFollow').and.callThrough();
       spy.calls.reset();
      component.unFollow();

      expect(spy).toHaveBeenCalled();
     });
  
    it('likeDelete should be called', () => {
       let spy = spyOn(component, 'likeDelete').and.callThrough();
       spy.calls.reset();
      component.likeDelete();

     expect(spy).toHaveBeenCalled();
     });

      it('deleteArticle should be called', () => {
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
