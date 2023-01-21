import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { SoldPrestationService } from 'src/app/core/services/sold-prestation.service';
import * as PrestationSoldActions from '../actions/prestation-sales.actions';

@Injectable()
export class PrestationSalesEffects {

  constructor(
    private actions$: Actions,
    private prestationSoldService: SoldPrestationService
  ) {}

  loadPrestationSold$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationSoldActions.mSBeautyPrestationSold),
    switchMap(() => {
      return this.prestationSoldService.getAll()
        .pipe(
          map((data) => {
            return PrestationSoldActions.mSBeautyPrestationSoldSuccess({ data })
          }),
          catchError((error) => of(PrestationSoldActions.mSBeautyPrestationSoldFailure({ error })))
        )
    })
  ));

  loadPrestationSoldByCustomer = createEffect(() => this.actions$.pipe(
    ofType(PrestationSoldActions.mSBeautyPrestationSoldByCustomer),
    switchMap(({ id }) => {
      return this.prestationSoldService.getAllByCustomerId(id)
        .pipe(
          map((data) => {
            return PrestationSoldActions.mSBeautyPrestationSoldByCustomerSuccess({ data })
          }),
          catchError((error) => of(PrestationSoldActions.mSBeautyPrestationSoldByCustomerFailure({ error })))
        )
    })
  ))

  createPrestationSold$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationSoldActions.mSBeautyCreatePrestationSold),
    switchMap(({ data }) => {
      return this.prestationSoldService.create(data)
      .pipe(
        map((data) => {
          return PrestationSoldActions.mSBeautyCreatePrestationSoldSuccess({ data })
        }),
        catchError((error) => of(PrestationSoldActions.mSBeautyCreatePrestationSoldFailure({ error: 'Error when create prestation' })))
      )
    })
  ));
}
