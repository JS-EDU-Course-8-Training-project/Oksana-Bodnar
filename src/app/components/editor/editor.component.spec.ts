import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { Articles } from 'src/app/shared/models/articles.model';
import { CreateArticle } from 'src/app/shared/models/createArticle.model';

import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

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

   const articleServiceStub = jasmine.createSpyObj('GetArticleService', ['getArticle']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditorComponent],
       imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
               providers: [
          { provide: GetArticleService, useValue: articleServiceStub}
      ],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('update should be called', () => {
       let spy = spyOn(component, 'update').and.callThrough();
       spy.calls.reset();
    component.update();

    expect(spy).toBeTruthy();
    });
  
      it('publish should be called', () => {
       let spy = spyOn(component, 'publish').and.callThrough();
       spy.calls.reset();
    component.publish();

    expect(spy).toBeTruthy();
      });
  
    it('gettingArticleData should have Subscription', () => {
      articleServiceStub.getArticle.and.returnValue(of(draftArticles));
      component.slug = 'slug'
    component.gettingArticleData();
    const subscription = component.subscriptionArticle$ instanceof Subscription;
    expect(subscription).toBeTrue();
  });
  
});
