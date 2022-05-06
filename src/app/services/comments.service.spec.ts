import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Comments } from 'src/app/shared/models/comments.model';
import { of } from 'rxjs';

describe('CommentsService', () => {

  const draftComments: { comments: Comments[]} = {
    comments:  [{
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
      }]
  }

  let service: CommentsService;

  let httpMock = {
    get: jasmine.createSpyObj(of(draftComments)),
    put: jasmine.createSpyObj(of(draftComments)),
    post: jasmine.createSpyObj(of(draftComments)),
    delete: jasmine.createSpyObj(of())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, HttpClientModule],
        providers: [
          { provide: HttpClient, useValue: httpMock }]
    });
    service = TestBed.inject(CommentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Slug', () => {
    spyOn(service, 'getArticleSlug').and.callThrough();
    let a = service.getArticleSlug('slug-there');
    expect(a).toBe('slug-there', 'should be slug-there')
  });
    
 it('deleteCommentService should be called', waitForAsync(() => {    
   const spy = spyOn(httpMock, 'delete').and.returnValue(of());
   const data = service.deleteCommentService().subscribe();
   expect(data).toBeTruthy();
  }));

 
  it('postCommentService() should execute http request', waitForAsync(() => {    
    const spy = spyOn(httpMock, 'post').and.returnValue(of(draftComments));
    service.postCommentService({body: 'body'}).subscribe((data) => {
      expect(data).toEqual(draftComments.comments);
    });
  }));

  it('getComments() should check return value', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftComments));
    service.getComments().subscribe((data) => {
      expect(data).toEqual(draftComments.comments);
    })
  }));
})
  
