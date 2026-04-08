import { TestBed } from '@angular/core/testing';

import { Harrypotter } from './harrypotter';

describe('Harrypotter', () => {
  let service: Harrypotter;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Harrypotter);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
