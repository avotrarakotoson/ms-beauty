import { PrestationSold } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import * as SoldPrestationActions from '../actions/prestation-sales.actions';

export const prestationSalesFeatureKey = 'prestationSold';

export interface SoldPrestationState {
  loading: boolean;
  data: PrestationSold[],
  dataByCustomer: PrestationSold[],
  error: string
}

export const initialState: SoldPrestationState = {
  loading: false,
  data: [],
  dataByCustomer: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    SoldPrestationActions.mSBeautyPrestationSold,
    SoldPrestationActions.mSBeautyCreatePrestationSold,
    SoldPrestationActions.mSBeautyPrestationSoldByCustomer,
    (state) => ({
      ...state,
      loading: true,
      dataByCustomer: []
    })
  ),
  on(
    SoldPrestationActions.mSBeautyPrestationSoldFailure,
    SoldPrestationActions.mSBeautyPrestationSoldFailure,
    SoldPrestationActions.mSBeautyPrestationSoldByCustomerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error,
      dataByCustomer: []
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
  on(
    SoldPrestationActions.mSBeautyPrestationSoldByCustomerSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      dataByCustomer: [...data],
    })
  ),
);
