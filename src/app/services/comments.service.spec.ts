import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import { Comments } from 'src/app/shared/models/comments.model';
import { of } from 'rxjs';


describe('CommentsService', () => {

  let service: CommentsService;
  let httpMock: HttpTestingController;
  let url = 'https://api.realworld.io/api';
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
  
  

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, HttpClientModule]
    });
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
    
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Slug', () => {
    spyOn(service, 'getArticleSlug').and.callThrough();
    let a = service.getArticleSlug('slug-there');
    let b = service.getArticleSlug('another-slug');

    expect(a).toBe('slug-there', 'should be slug-there')
    expect(b).toBe('another-slug', 'should be another-slug')
  });
    
  it('deleteCommentService should be called', () => {
    spyOn(service, 'deleteCommentService').and.callThrough();
    let a = service.deleteCommentService();
    expect(a).toBeTruthy();
  });
  
  it('getComments() should execute http request', waitForAsync(() => {
    service.getComments().subscribe((res) => {
      expect(res).toEqual(draftComments);
    });
  }));
  
  it('postCommentService() should execute http request', waitForAsync(() => {
    service.postCommentService({body: 'some body'}).subscribe((res) => {
      expect(res).toEqual(draftComments);
    });
  }));

  })
