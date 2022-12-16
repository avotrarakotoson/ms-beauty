import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { prestationFeatureKey, PrestationState } from '../reducers/prestation.reducer';

const selectPrestationState: MemoizedSelector<object, PrestationState> = createFeatureSelector<PrestationState>(prestationFeatureKey)

export const selectPrestations = createSelector(
  selectPrestationState,
  (state: PrestationState) => state.data
);