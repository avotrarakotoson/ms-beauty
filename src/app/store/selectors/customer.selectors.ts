import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { customerFeatureKey, CustomerState } from '../reducers/customer.reducer';

const selectUserState: MemoizedSelector<object, CustomerState> = createFeatureSelector<CustomerState>(customerFeatureKey)

export const selectUsers = createSelector(
  selectUserState,
  (state: CustomerState) => state.data
);

export const selectCustomerFullName = (id: number) => createSelector(
  selectUserState,
  (state: CustomerState) => state.data.find(customer => customer.id === id)?.fullName
);