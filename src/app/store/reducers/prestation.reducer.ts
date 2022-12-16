import { UpdatePrestationDto } from 'src/app/core/dtos/prestation.dto';
import { Prestation } from 'src/app/models';
import { createReducer, on } from '@ngrx/store';
import * as PrestationActions from '../actions/prestation.actions';

export const prestationFeatureKey = 'prestation';

export interface PrestationState {
  loading: boolean;
  data: Prestation[];
  error: string;
}

export const initialState: PrestationState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    PrestationActions.mSBeautyPrestations,
    PrestationActions.mSBeautyCreatePrestation,
    PrestationActions.mSBeautyUpdatePrestation,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    PrestationActions.mSBeautyPrestationsFailure,
    PrestationActions.mSBeautyCreatePrestationFailure,
    PrestationActions.mSBeautyUpdatePrestationFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    PrestationActions.mSBeautyPrestationsSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    PrestationActions.mSBeautyCreatePrestationSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [...state.data, data],
    })
  ),
  on(
    PrestationActions.mSBeautyUpdatePrestationSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: updatePrestaion(state.data, data),
    })
  )
);

const updatePrestaion = (prestations: Prestation[], value: UpdatePrestationDto): Prestation[] => {
  const result = prestations.map(prestation => {
    if (prestation.id === value.id) {
      prestation = Object.assign({...prestation}, value);
    }

    return prestation;
  })

  return result;
}
