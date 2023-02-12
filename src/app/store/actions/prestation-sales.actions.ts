import { createAction, props } from '@ngrx/store';
import { CreateSoldPrestationDto } from 'src/app/core/dtos/sold-prestation.dto';
import { PrestationSold } from 'src/app/models';

// Get Action
export const mSBeautyPrestationSold = createAction(
  '[PrestationSold] MSBeauty PrestationSold',
);
export const mSBeautyPrestationSoldSuccess = createAction(
  '[PrestationSold] MSBeauty PrestationSold Success',
  props<{ data: PrestationSold[] }>()
);
export const mSBeautyPrestationSoldFailure = createAction(
  '[PrestationSold] MSBeauty PrestationSold Failure',
  props<{ error: string }>()
);

export const mSBeautyPrestationSoldByCustomer = createAction(
  '[PrestationSold] MSBeauty PrestationSold by Customer',
  props<{ id: number }>()
);
export const mSBeautyPrestationSoldByCustomerSuccess = createAction(
  '[PrestationSold] MSBeauty PrestationSold by Customer Success',
  props<{ data: PrestationSold[] }>()
);
export const mSBeautyPrestationSoldByCustomerFailure = createAction(
  '[PrestationSold] MSBeauty PrestationSold by Customer Failure',
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