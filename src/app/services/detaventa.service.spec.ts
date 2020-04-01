import { TestBed } from '@angular/core/testing';

import { DetaventaService } from './detaventa.service';

describe('DetaventaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetaventaService = TestBed.get(DetaventaService);
    expect(service).toBeTruthy();
  });
});
