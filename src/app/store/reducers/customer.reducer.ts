import { UpdateCustomerDto } from 'src/app/core/dtos/customer.dto';
import { createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models';
import * as CustomerActions from '../actions/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  loading: boolean;
  data: Customer[];
  error: string;
}

export const initialState: CustomerState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    CustomerActions.mSBeautyCustomers,
    CustomerActions.mSBeautyCreateCustomer,
    CustomerActions.mSBeautyUpdateCustomer,
    CustomerActions.mSBeautyDeleteCustomer,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    CustomerActions.mSBeautyCustomersFailure,
    CustomerActions.mSBeautyCreateCustomerFailure,
    CustomerActions.mSBeautyUpdateCustomerFailure,
    CustomerActions.mSBeautyDeleteCustomerFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    CustomerActions.mSBeautyCustomersSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    CustomerActions.mSBeautyCreateCustomerSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [data, ...state.data],
    })
  ),
  on(
    CustomerActions.mSBeautyUpdateCustomerSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: updateCustomer(state.data, data),
    })
  ),
  on(
    CustomerActions.mSBeautyDeleteCustomerSuccess,
    (state, { id }) => ({
      ...state,
      loading: false,
      data: deleteCustomer(state.data, id),
    })
  )
);

const updateCustomer = (customers: Customer[], value: UpdateCustomerDto): Customer[] => {
  const result = customers.map(customer => {
    if (customer.id === value.id) {
      customer = Object.assign({...customer}, value);
    }

    return customer;
  })

  return result;
}

const deleteCustomer = (customers: Customer[], id: number): Customer[] => {
  return customers.filter(customer => customer.id !== id)
}
