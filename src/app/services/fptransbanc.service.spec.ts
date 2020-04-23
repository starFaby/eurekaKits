import { TestBed } from '@angular/core/testing';

import { FptransbancService } from './fptransbanc.service';

describe('FptransbancService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FptransbancService = TestBed.get(FptransbancService);
    expect(service).toBeTruthy();
  });
});
