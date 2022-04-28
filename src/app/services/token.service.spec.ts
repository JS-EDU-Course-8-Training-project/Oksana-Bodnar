import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TokenInterceptor } from './token.service';

describe('TokenInterceptor', () => {
  let service: TokenInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(TokenInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});