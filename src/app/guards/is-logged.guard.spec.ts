import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { IsLoggedGuard } from './is-logged.guard';

describe('IsLoggedGuard', () => {
  let guard: IsLoggedGuard;
  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        HttpClientTestingModule,
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
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