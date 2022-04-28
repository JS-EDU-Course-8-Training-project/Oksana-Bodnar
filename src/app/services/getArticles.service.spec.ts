import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GetArticleService } from './getArticles.service';

describe('GetArticleService', () => {
  let service: GetArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(GetArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
