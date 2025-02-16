import { TestBed } from '@angular/core/testing';

import { SHAService } from './sha.service';

describe('SHAService', () => {
  let service: SHAService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SHAService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
