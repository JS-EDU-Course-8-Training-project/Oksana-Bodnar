import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IsLoggedGuard } from './is-logged.guard';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    
    guard = TestBed.inject(IsLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should be called', () => {
    let spy = spyOn(guard, 'canActivate').and.callThrough();
    spy.calls.reset();
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: 'login'});
    expect(spy).toBeTruthy();
  });
});