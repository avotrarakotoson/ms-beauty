import { UpdatePrestationDto } from './../../core/dtos/prestation.dto';
import { createAction, props } from '@ngrx/store';
import { CreatePrestationDto } from 'src/app/core/dtos/prestation.dto';
import { Prestation } from 'src/app/models';

// Get Action
export const mSBeautyPrestations = createAction(
  '[Prestation] MSBeauty Prestations'
);
export const mSBeautyPrestationsSuccess = createAction(
  '[Prestation] MSBeauty Prestations Success',
  props<{ data: Prestation[] }>()
);
export const mSBeautyPrestationsFailure = createAction(
  '[Prestation] MSBeauty Prestations Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreatePrestation = createAction(
  '[Prestation] MSBeauty Create Prestation',
  props<{ data: CreatePrestationDto }>()
);
export const mSBeautyCreatePrestationSuccess = createAction(
  '[Prestation] MSBeauty Create Prestation Success',
  props<{ data: Prestation }>()
);
export const mSBeautyCreatePrestationFailure = createAction(
  '[Prestation] MSBeauty Create Prestation Failure',
  props<{ error: string }>()
);

// Update Action
export const mSBeautyUpdatePrestation = createAction(
  '[Prestation] MSBeauty Update Prestation',
  props<{ data: UpdatePrestationDto }>()
);
export const mSBeautyUpdatePrestationSuccess = createAction(
  '[Prestation] MSBeauty Update Prestation Success',
  props<{ data: UpdatePrestationDto }>()
);
export const mSBeautyUpdatePrestationFailure = createAction(
  '[Prestation] MSBeauty Update Prestation Failure',
  props<{ error: string }>()
);

// Delete Action
export const mSBeautyDeletePrestation = createAction(
  '[Prestation] MSBeauty Delete Prestation',
  props<{ id: number }>()
);
export const mSBeautyDeletePrestationSuccess = createAction(
  '[Prestation] MSBeauty Delete Prestation Success',
  props<{ id: number }>()
);
export const mSBeautyDeletePrestationFailure = createAction(
  '[Prestation] MSBeauty Delete Prestation Failure',
  props<{ error: string }>()
);
