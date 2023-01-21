import { createAction, props } from '@ngrx/store';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/app/core/dtos/customer.dto';
import { Customer } from 'src/app/models';

// Get Action
export const mSBeautyCustomers = createAction(
  '[Customer] MSBeauty Customers'
);
export const mSBeautyCustomersSuccess = createAction(
  '[Customer] MSBeauty Customers Success',
  props<{ data: Customer[] }>()
);
export const mSBeautyCustomersFailure = createAction(
  '[Customer] MSBeauty Customers Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreateCustomer = createAction(
  '[Customer] MSBeauty Create Customer',
  props<{ data: CreateCustomerDto }>()
);
export const mSBeautyCreateCustomerSuccess = createAction(
  '[Customer] MSBeauty Create Customer Success',
  props<{ data: Customer }>()
);
export const mSBeautyCreateCustomerFailure = createAction(
  '[Customer] MSBeauty Create Customer Failure',
  props<{ error: string }>()
);

// Update Action
export const mSBeautyUpdateCustomer = createAction(
  '[Customer] MSBeauty Update Customer',
  props<{ data: UpdateCustomerDto }>()
);
export const mSBeautyUpdateCustomerSuccess = createAction(
  '[Customer] MSBeauty Update Customer Success',
  props<{ data: UpdateCustomerDto }>()
);
export const mSBeautyUpdateCustomerFailure = createAction(
  '[Customer] MSBeauty Update Customer Failure',
  props<{ error: string }>()
);

// Delete Action
export const mSBeautyDeleteCustomer = createAction(
  '[Customer] MSBeauty Delete Customer',
  props<{ id: number }>()
);
export const mSBeautyDeleteCustomerSuccess = createAction(
  '[Customer] MSBeauty Delete Customer Success',
  props<{ id: number }>()
);
export const mSBeautyDeleteCustomerFailure = createAction(
  '[Customer] MSBeauty Delete Customer Failure',
  props<{ error: string }>()
);