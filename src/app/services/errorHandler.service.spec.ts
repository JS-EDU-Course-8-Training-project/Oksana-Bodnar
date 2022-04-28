import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ErrorHandlerInterceptor } from './errorHandler.service';

describe('ErrorHandlerInterceptor', () => {
  let service: ErrorHandlerInterceptor;

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