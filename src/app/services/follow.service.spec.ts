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
    let spy = spyOn(service, 'follow').and.callThrough();
    service.follow('someName');
    expect(spy).toHaveBeenCalledOnceWith('someName');
  });

  it('unFollow should be called', () => {
    let spy = spyOn(service, 'unFollow').and.callThrough();
    service.unFollow('someName');
    expect(spy).toHaveBeenCalledOnceWith('someName');
  });
  
});
