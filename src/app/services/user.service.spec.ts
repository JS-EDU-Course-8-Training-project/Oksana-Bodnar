import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ResponseUser } from '../shared/models/ResponseUser.model';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  
  const user = {
    user: {
      username: 'someName',
      email: 'someEmail',
      password: 'somePassword'
    }
  };
  
  const draftResUser: { user: ResponseUser } = {
    user: {
      email: 'email',
      token: 'token',
      username: 'username',
      bio: 'bio',
      image: 'href'
    }
  };
  
  const draftNewUser: ResponseUser = {
    email: 'email',
    token: 'token',
    username: 'username',
    bio: 'bio',
    image: 'href'
  }
  
   let httpMock = {
    get: jasmine.createSpyObj(of(draftResUser)),
    put: jasmine.createSpyObj(of(draftResUser)),
    post: jasmine.createSpyObj(of(draftResUser)),
    delete: jasmine.createSpyObj(of(draftResUser))
   };
  
  class RouterStub {
        url = '';
        navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: HttpClient, useValue: httpMock },
      { provide: Router, useClass: RouterStub }]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should called getToken', () => {
    const spy = spyOn(service, 'getToken').and.callThrough();
    service.getToken();
    expect(spy).toHaveBeenCalled();
  });

  it('doLogout should be called', () => {
    const spy = spyOn(service, 'doLogout').and.callThrough();
    service.doLogout();
    expect(spy).toHaveBeenCalled();
  });

  it('setUser should be called', () => {
    const spy = spyOn(service, 'setUser').and.callThrough();
    service.setUser('someName','someEmail','somePassword');
    expect(spy).toHaveBeenCalledWith('someName','someEmail','somePassword');
  });

  it('register should be called', waitForAsync(() => {    
    const spy = spyOn(httpMock, 'post').and.returnValue(of(draftResUser));
    service.register(user).subscribe((data) => {
    expect(data).toEqual(draftResUser.user);
    });
  }));

  it('logUser should be called', waitForAsync(() => {
    const spy = spyOn(httpMock, 'post').and.returnValue(of(draftResUser));
    service.logUser(user).subscribe((data) => {
    expect(data).toEqual(draftResUser.user);
    });
  }));
  
  it('getLoggedUser should be called', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftResUser));
    service.getLoggedUser().subscribe((data) => {
    expect(data).toEqual(draftResUser.user);
    });
  }));
});