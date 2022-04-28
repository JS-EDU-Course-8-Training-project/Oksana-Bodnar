import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CreateAerticleService } from './createArticle.service';

describe('CreateAerticleService', () => {
  let service: CreateAerticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule]
    });
    service = TestBed.inject(CreateAerticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
