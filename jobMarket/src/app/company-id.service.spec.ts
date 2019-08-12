import { TestBed } from '@angular/core/testing';

import { CompanyIdService } from './company-id.service';

describe('CompanyIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyIdService = TestBed.get(CompanyIdService);
    expect(service).toBeTruthy();
  });
});
