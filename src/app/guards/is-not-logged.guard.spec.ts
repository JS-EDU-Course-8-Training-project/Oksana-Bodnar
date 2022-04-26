import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IsNotLoggedGuard } from './is-not-logged.guard';

describe('IsNotLoggedGuard', () => {
  let guard: IsNotLoggedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ]
    });
    guard = TestBed.inject(IsNotLoggedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
