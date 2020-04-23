import { TestBed } from '@angular/core/testing';

import { FpefectivoService } from './fpefectivo.service';

describe('FpefectivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FpefectivoService = TestBed.get(FpefectivoService);
    expect(service).toBeTruthy();
  });
});
