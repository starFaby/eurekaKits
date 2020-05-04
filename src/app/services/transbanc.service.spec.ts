import { TestBed } from '@angular/core/testing';

import { TransbancService } from './transbanc.service';

describe('TransbancService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransbancService = TestBed.get(TransbancService);
    expect(service).toBeTruthy();
  });
});
