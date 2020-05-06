import { TestBed } from '@angular/core/testing';

import { PaypalbuyService } from './paypalbuy.service';

describe('PaypalbuyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaypalbuyService = TestBed.get(PaypalbuyService);
    expect(service).toBeTruthy();
  });
});
