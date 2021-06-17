import { TestBed } from '@angular/core/testing';

import { OptionFilterService } from './option-filter.service';

describe('FilterServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionFilterService = TestBed.get(OptionFilterService);
    expect(service).toBeTruthy();
  });
});
