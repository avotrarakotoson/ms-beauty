import { PrestationSold } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import * as SoldPrestationActions from '../actions/prestation-sales.actions';

export const prestationSalesFeatureKey = 'prestationSold';

export interface SoldPrestationState {
  loading: boolean;
  data: PrestationSold[],
  error: string
}

export const initialState: SoldPrestationState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    SoldPrestationActions.mSBeautyPrestationSold,
    SoldPrestationActions.mSBeautyCreatePrestationSold,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    SoldPrestationActions.mSBeautyPrestationSoldFailure,
    SoldPrestationActions.mSBeautyPrestationSoldFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    SoldPrestationActions.mSBeautyPrestationSoldSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    SoldPrestationActions.mSBeautyCreatePrestationSoldSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [...state.data, data],
    })
  ),
);
