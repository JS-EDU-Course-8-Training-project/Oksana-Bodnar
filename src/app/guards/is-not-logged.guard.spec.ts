import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from '../services/user.service'

import { IsNotLoggedGuard } from './is-not-logged.guard';

describe('IsNotLoggedGuard', () => {
  let guard: IsNotLoggedGuard;
  let userService: UserService;
  const authMock = jasmine.createSpyObj('UserService', ['isLoggedIn']);

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
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

    expect(spy).toBeTruthy();
      });
});
