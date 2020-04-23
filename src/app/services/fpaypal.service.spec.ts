import { TestBed } from '@angular/core/testing';

import { FpaypalService } from './fpaypal.service';

describe('FpaypalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FpaypalService = TestBed.get(FpaypalService);
    expect(service).toBeTruthy();
  });
});
