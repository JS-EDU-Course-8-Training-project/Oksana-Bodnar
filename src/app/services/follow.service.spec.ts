import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FollowService } from './follow.service';

describe('FollowService', () => {
  let service: FollowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule ]
    });
    service = TestBed.inject(FollowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('follow should be called', () => {
    spyOn(service, 'follow').and.callThrough();
    let a = service.follow('someName');
    expect(a).toBeTruthy();
  });

  it('unFollow should be called', () => {
    spyOn(service, 'unFollow').and.callThrough();
    let a = service.unFollow('someName');
    expect(a).toBeTruthy();
  });
  
});
