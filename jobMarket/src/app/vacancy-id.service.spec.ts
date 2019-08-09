import { TestBed } from '@angular/core/testing';

import { VacancyIdService } from './vacancy-id.service';

describe('VacancyIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VacancyIdService = TestBed.get(VacancyIdService);
    expect(service).toBeTruthy();
  });
});
