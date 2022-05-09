import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LikeService } from './like.service';

describe('LikeService', () => {
  let service: LikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });

    service = TestBed.inject(LikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('like should be called', () => {
    const spy = spyOn(service, 'like').and.callThrough();
    service.like('someArticle');
    expect(spy).toHaveBeenCalledOnceWith('someArticle');
  });

  it('unFollow should be called', () => {
    const spy = spyOn(service, 'likeDelete').and.callThrough();
    service.likeDelete('someArticle');
    expect(spy).toHaveBeenCalledOnceWith('someArticle');
  });
});
