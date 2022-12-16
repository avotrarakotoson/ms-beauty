import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PrestationSalesEffects } from './prestation-sales.effects';

describe('PrestationSalesEffects', () => {
  let actions$: Observable<any>;
  let effects: PrestationSalesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrestationSalesEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PrestationSalesEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
