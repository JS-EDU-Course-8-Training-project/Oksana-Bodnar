import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { inject, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';


import { ErrorHandlerInterceptor } from './errorHandler.service';
import { GetArticleService } from './getArticles.service';

describe('ErrorHandlerInterceptor', () => {
  let service: ErrorHandlerInterceptor;
  let serviceForRequest: GetArticleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
       providers: [
        GetArticleService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true,
        },
      ],
    });
    service = TestBed.inject(ErrorHandlerInterceptor);
    serviceForRequest = TestBed.inject(GetArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('should be called with error', waitForAsync(() => {
  serviceForRequest.getArticlesFeed(10, 0).subscribe(response => {
    expect(response).toBeFalsy();
  });
    const httpRequest = httpMock.expectOne(`https://api.realworld.io/api/articles/feed/?limit=10&offset=0`);
  expect(httpRequest.error).toBeTruthy();
  }));

    it('should be called with error 400', waitForAsync(() => {
      let response: any;
      let errResponse: any;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = {};
      serviceForRequest.getArticlesFeed(10, 0).subscribe(res => response = res, err => errResponse = err);
      httpMock.expectOne(`https://api.realworld.io/api/articles/feed/?limit=10&offset=0`).flush(data, mockErrorResponse);
      expect(errResponse).toBeTruthy();
    }));



    it('should be called with error 400', waitForAsync(() => {
      let response: any;
      let errResponse: any;
      const mockErrorResponse = { status: 400, statusText: 'Bad Request' };
      const data = {};
      serviceForRequest.getArticlesFeed(10, 0).subscribe(res => response = res, err => errResponse = err);
      httpMock.expectOne(`https://api.realworld.io/api/articles/feed/?limit=10&offset=0`).error(new ErrorEvent('network error'));
      expect(errResponse).toBeTruthy();
    }));

});

