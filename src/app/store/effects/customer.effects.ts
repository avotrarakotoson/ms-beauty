import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CustomerService } from 'src/app/core/services/customer.service';
import * as CustomerActions from '../actions/customer.actions';


@Injectable()
export class CustomerEffects {

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}

  loadCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.mSBeautyCustomers),
    switchMap(() => {
      return this.customerService.getAll()
        .pipe(
          map((customers) => {
            return CustomerActions.mSBeautyCustomersSuccess({ data: customers })
          }),
          catchError((error) => of(CustomerActions.mSBeautyCustomersFailure({ error: 'Error loading customer' })))
        )
    })
  ));

  createCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.mSBeautyCreateCustomer),
    switchMap(({ data }) => {
      return this.customerService.create(data)
        .pipe(
          map((customer) => {
            return CustomerActions.mSBeautyCreateCustomerSuccess({ data: customer })
          }),
          catchError((error) => of(CustomerActions.mSBeautyCreateCustomerFailure({ error: 'Error when create customer' })))
        )
    })
  ));

  updateCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.mSBeautyUpdateCustomer),
    switchMap(({ data }) => {
      return this.customerService.update(data)
        .pipe(
          map((isUpdated) => {
            if (!isUpdated) {
              return CustomerActions.mSBeautyUpdateCustomerFailure({ error: 'Error when update customer' });
            }

            return CustomerActions.mSBeautyUpdateCustomerSuccess({ data })
          }),
          catchError((error) => of(CustomerActions.mSBeautyUpdateCustomerFailure({ error: 'Error when update customer' })))
        )
    })
  ));

  deleteCustomer$ = createEffect(() => this.actions$.pipe(
    ofType(CustomerActions.mSBeautyDeleteCustomer),
    switchMap(({ id }) => {
      return this.customerService.delete(id)
        .pipe(
          map((isDeleted) => {
            if (!isDeleted) {
              return CustomerActions.mSBeautyDeleteCustomerFailure({ error: 'Cannot delete customer' })
            }

            return CustomerActions.mSBeautyDeleteCustomerSuccess({ id });
          }),
          catchError((error) => of(CustomerActions.mSBeautyDeleteCustomerFailure({ error: 'Error when delete customer' })))
        )
    })
  ))
}
