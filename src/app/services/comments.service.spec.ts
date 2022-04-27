import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClient, HttpClientModule, HttpResponse} from '@angular/common/http';
import { Comments } from 'src/app/shared/models/comments.model';


describe('CommentsService', () => {

  let service: CommentsService;
  const dummyComments: Comments[] = [{
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
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get Slug and return Slug', () => {
    spyOn(service, 'getArticleSlug').and.callThrough();
    let a = service.getArticleSlug('slug-there');
    let b = service.getArticleSlug('another-slug');

    expect(a).toBe('slug-there', 'should be slug-there')
    expect(b).toBe('another-slug', 'should be another-slug')
  });
  
  it('be able to get comments from the API using GET', () => {
    
    service.getComments().subscribe(comments => {
      expect(comments.length).toBe(2);
      expect(comments).toEqual(dummyComments);
    })
   })

  it('should get comments from BehaviourSubject', async(() => {
    service.comments$.next(dummyComments);
    service.getComments();
    service.comments$.subscribe((val: Comments[]) => expect(val).toEqual(dummyComments));
  }))

  })
