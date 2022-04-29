import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorHandlerInterceptor } from './errorHandler.service';

describe('ErrorHandlerInterceptor', () => {
  let service: ErrorHandlerInterceptor;
  // let httpClient;
  // let httpMock;

  //   httpClient = TestBed.inject(HttpClient);
  //   httpMock = TestBed.inject(HttpTestingController);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(ErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});