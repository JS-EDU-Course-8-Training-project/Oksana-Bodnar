import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service'
import { IsNotLoggedGuard } from './is-not-logged.guard';

describe('IsNotLoggedGuard', () => {
  let guard: IsNotLoggedGuard;
  let userService: UserService;
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
    
    guard = TestBed.inject(IsNotLoggedGuard);
    userService = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('canActivate should be called', () => {
    let spy = spyOn(guard, 'canActivate').and.callThrough();
    spy.calls.reset();
    guard.canActivate(new ActivatedRouteSnapshot(), <RouterStateSnapshot>{url: ''});
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
