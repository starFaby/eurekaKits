import { TestBed } from '@angular/core/testing';

import { CateproduService } from './cateprodu.service';

describe('CateproduService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CateproduService = TestBed.get(CateproduService);
    expect(service).toBeTruthy();
  });
});
