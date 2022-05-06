import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { GetArticleService } from './getArticles.service';
import { TokenInterceptor } from './token.service';
import { UserService } from './user.service';

describe('TokenInterceptor', () => {
  let service: TokenInterceptor;
  let serviceForRequest: GetArticleService;
  let httpMock: HttpTestingController;
  const userServiceStub = jasmine.createSpyObj('UserService', ['getToken']);
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        GetArticleService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true,
        },
        { provide: UserService, useValue: userServiceStub },
      ],
    });

      service = TestBed.inject(TokenInterceptor);
      serviceForRequest = TestBed.inject(GetArticleService);
      httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', waitForAsync(() => {
    userServiceStub.getToken.and.returnValue(of('token'));
    serviceForRequest.getArticlesFeed(10, 0).subscribe(response => {
    expect(response).toBeTruthy();
    });
    const httpRequest = httpMock.expectOne(`https://api.realworld.io/api/articles/feed/?limit=10&offset=0`);
    expect(httpRequest).toBeTruthy();
  }));
  
});

