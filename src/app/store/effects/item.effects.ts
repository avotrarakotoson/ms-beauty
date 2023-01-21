import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { ItemService } from 'src/app/core/services/item.service';
import * as ItemActions from '../actions/item.actions';

@Injectable()
export class ItemEffects {

  constructor(
    private actions$: Actions,
    private itemService: ItemService
  ) {}

  loadItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.mSBeautyItem),
    switchMap(() => {
      return this.itemService.getAll()
        .pipe(
          map((items) => {
            return ItemActions.mSBeautyItemSuccess({ data: items })
          }),
          catchError((error) => of(ItemActions.mSBeautyItemFailure({ error: 'Error loading item' })))
        )
    })
  ));

  createItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.mSBeautyCreateItem),
    switchMap(({ data }) => {
      return this.itemService.create(data)
        .pipe(
          map((item) => {
            return ItemActions.mSBeautyCreateItemSuccess({ data: item })
          }),
          catchError((error) => of(ItemActions.mSBeautyCreateItemFailure({ error: 'Error when create item' })))
        )
    })
  ));

  deleteItem$ = createEffect(() => this.actions$.pipe(
    ofType(ItemActions.mSBeautyDeleteItem),
    switchMap(({ id }) => {
      return this.itemService.delete(id)
        .pipe(
          map((isDeleted) => {
            if (!isDeleted) {
              return ItemActions.mSBeautyDeleteItemFailure({ error: 'Error when delete item' })
            }

            return ItemActions.mSBeautyDeleteItemSuccess({ id });
          }),
          catchError((error) => of(ItemActions.mSBeautyDeleteItemFailure({ error: 'Error when delete item' })))
        )
    })
  ))
}
