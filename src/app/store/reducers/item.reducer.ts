import { Action, createReducer, on } from '@ngrx/store';
import { Item } from 'src/app/models';
import * as ItemActions from '../actions/item.actions';

export const itemFeatureKey = 'item';

export interface ItemState {
  loading: boolean;
  data: Item[];
  error: string;
}

export const initialState: ItemState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    ItemActions.mSBeautyItem,
    ItemActions.mSBeautyCreateItem,
    ItemActions.mSBeautyDeleteItem,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    ItemActions.mSBeautyItemFailure,
    ItemActions.mSBeautyCreateItemFailure,
    ItemActions.mSBeautyDeleteItemFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    ItemActions.mSBeautyItemSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    ItemActions.mSBeautyCreateItemSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [...state.data, data]
    })
  ),
  on(
    ItemActions.mSBeautyDeleteItemSuccess,
    (state, { id }) => ({
      ...state,
      loading: false,
      data: [...state.data.filter(item => item.id != id)],
    })
  )
);
