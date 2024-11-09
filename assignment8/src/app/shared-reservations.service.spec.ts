import { TestBed } from '@angular/core/testing';

import { SharedReservationsService } from './shared-reservations.service';

describe('SharedReservationsService', () => {
  let service: SharedReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
