import { TestBed } from '@angular/core/testing';

import { SoldPrestationService } from './sold-prestation.service';

describe('SoldPrestationService', () => {
  let service: SoldPrestationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoldPrestationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
