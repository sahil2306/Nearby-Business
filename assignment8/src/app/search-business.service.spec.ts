import { TestBed } from '@angular/core/testing';

import { SearchBusinessService } from './search-business.service';

describe('SearchBusinessService', () => {
  let service: SearchBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
