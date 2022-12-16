import { createAction, props } from '@ngrx/store';
import { CreateSoldPrestationDto } from 'src/app/core/dtos/sold-prestation.dto';
import { PrestationSold } from 'src/app/models';

export const mSBeautyPrestationSold = createAction(
  '[PrestationSold] MSBeauty PrestationSold '
);

export const mSBeautyPrestationSoldSuccess = createAction(
  '[PrestationSold] MSBeauty PrestationSold Success',
  props<{ data: PrestationSold[] }>()
);

export const mSBeautyPrestationSoldFailure = createAction(
  '[PrestationSold] MSBeauty PrestationSold Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreatePrestationSold = createAction(
  '[PrestationSold] MSBeauty Create PrestationSold',
  props<{ data: CreateSoldPrestationDto }>()
);

export const mSBeautyCreatePrestationSoldSuccess = createAction(
  '[PrestationSold] MSBeauty Create PrestationSold Success',
  props<{ data: PrestationSold }>()
);

export const mSBeautyCreatePrestationSoldFailure = createAction(
  '[PrestationSold] MSBeauty Create PrestationSold Failure',
  props<{ error: string }>()
);