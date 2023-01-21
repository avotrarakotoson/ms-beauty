import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { PrestationService } from 'src/app/core/services/prestation.service';
import * as PrestationActions from '../actions/prestation.actions';

@Injectable()
export class PrestationEffects {

  constructor(
    private actions$: Actions,
    private prestationService: PrestationService
  ) {}

  loadPrestation$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationActions.mSBeautyPrestations),
    switchMap(() => {
      return this.prestationService.getAll()
        .pipe(
          map((prestations) => {
            return PrestationActions.mSBeautyPrestationsSuccess({ data: prestations })
          }),
          catchError((error) => of(PrestationActions.mSBeautyPrestationsFailure({ error: 'Error loading prestation' })))
        )
    })
  ));

  createPrestation$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationActions.mSBeautyCreatePrestation),
    switchMap(({ data }) => {
      return this.prestationService.create(data)
        .pipe(
          map((prestation) => {
            return PrestationActions.mSBeautyCreatePrestationSuccess({ data: prestation })
          }),
          catchError((error) => of(PrestationActions.mSBeautyCreatePrestationFailure({ error: 'Error when create prestation' })))
        )
    })
  ));

  updatePrestation$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationActions.mSBeautyUpdatePrestation),
    switchMap(({ data }) => {
      return this.prestationService.update(data)
        .pipe(
          map((isUpdated) => {
            if (!isUpdated) {
              return PrestationActions.mSBeautyUpdatePrestationFailure({ error: 'Error when update prestation' });
            }

            return PrestationActions.mSBeautyUpdatePrestationSuccess({ data })
          }),
          catchError((error) => of(PrestationActions.mSBeautyUpdatePrestationFailure({ error: 'Error when update prestation' })))
        )
    })
  ));

  deletePrestation$ = createEffect(() => this.actions$.pipe(
    ofType(PrestationActions.mSBeautyDeletePrestation),
    switchMap(({ id }) => {
      return this.prestationService.delete(id)
        .pipe(
          map((isDeleted) => {
            if (!isDeleted) {
              return PrestationActions.mSBeautyDeletePrestationFailure({ error: 'Cannot delete prestation' })
            }

            return PrestationActions.mSBeautyDeletePrestationSuccess({ id });
          }),
          catchError((error) => of(PrestationActions.mSBeautyDeletePrestationFailure({ error: 'Error when delete prestation' })))
        )
    })
  ))
}
