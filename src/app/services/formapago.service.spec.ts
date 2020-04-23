import { TestBed } from '@angular/core/testing';

import { FormapagoService } from './formapago.service';

describe('FormapagoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormapagoService = TestBed.get(FormapagoService);
    expect(service).toBeTruthy();
  });
});
