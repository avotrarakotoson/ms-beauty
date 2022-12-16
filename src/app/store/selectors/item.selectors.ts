import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { itemFeatureKey, ItemState } from './../reducers/item.reducer';

const selecItemState: MemoizedSelector<object, ItemState> = createFeatureSelector<ItemState>(itemFeatureKey)

export const selectItems = createSelector(
  selecItemState,
  (state: ItemState) => state.data
);