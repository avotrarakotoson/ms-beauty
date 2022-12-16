import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { userFeatureKey, UserState } from '../reducers/user.reducer';

const selectUserState: MemoizedSelector<object, UserState> = createFeatureSelector<UserState>(userFeatureKey)

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.data
);