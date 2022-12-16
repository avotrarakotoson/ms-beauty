import { CreateItemDto } from './../../core/dtos/item.dto';
import { createAction, props } from '@ngrx/store';
import { Item } from 'src/app/models';

// Load Action
export const mSBeautyItem = createAction(
  '[Item] MSBeauty Items'
);

export const mSBeautyItemSuccess = createAction(
  '[Item] MSBeauty Items Success',
  props<{ data: Item[] }>()
);

export const mSBeautyItemFailure = createAction(
  '[Item] MSBeauty Items Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreateItem = createAction(
  '[Item] MSBeauty Create Item',
  props<{ data: CreateItemDto }>()
);
export const mSBeautyCreateItemSuccess = createAction(
  '[Item] MSBeauty Create Item Success',
  props<{ data: Item }>()
);
export const mSBeautyCreateItemFailure = createAction(
  '[Item] MSBeauty Create Item Failure',
  props<{ error: string }>()
);

// Update Action

// Delete Action
