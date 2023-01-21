import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { prestationSalesFeatureKey, SoldPrestationState } from '../reducers/prestation-sales.reducer';

const selectPrestationSoldState: MemoizedSelector<object, SoldPrestationState> = createFeatureSelector<SoldPrestationState>(prestationSalesFeatureKey)

export const selectSoldPrestations = createSelector(
  selectPrestationSoldState,
  (state: SoldPrestationState) => state.data
);

export const selectSoldPrestationsByCustomer = createSelector(
  selectPrestationSoldState,
  (state: SoldPrestationState) => state.dataByCustomer
);
