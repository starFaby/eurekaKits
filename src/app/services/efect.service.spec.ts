import { TestBed } from '@angular/core/testing';

import { EfectService } from './efect.service';

describe('EfectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EfectService = TestBed.get(EfectService);
    expect(service).toBeTruthy();
  });
});
