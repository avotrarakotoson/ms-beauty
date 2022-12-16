import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { PrestationEffects } from './prestation.effects';

describe('PrestationEffects', () => {
  let actions$: Observable<any>;
  let effects: PrestationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PrestationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(PrestationEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
