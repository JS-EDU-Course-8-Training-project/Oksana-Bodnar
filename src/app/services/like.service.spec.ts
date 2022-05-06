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
    spyOn(service, 'like').and.callThrough();
    let a = service.like('someArticle');
    expect(a).toBeTruthy();
  });

  it('unFollow should be called', () => {
    spyOn(service, 'likeDelete').and.callThrough();
    let a = service.likeDelete('someArticle');
    expect(a).toBeTruthy();
  });
});
