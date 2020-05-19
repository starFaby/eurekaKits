import { TestBed } from '@angular/core/testing';

import { DtoService } from './dto.service';

describe('DtoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DtoService = TestBed.get(DtoService);
    expect(service).toBeTruthy();
  });
});
