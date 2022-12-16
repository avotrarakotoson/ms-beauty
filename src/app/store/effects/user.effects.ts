import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import * as UserActions from '../actions/user.actions';


@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.mSBeautyUsers),
    switchMap(() => {
      return this.userService.getAll()
        .pipe(
          map((users) => {
            return UserActions.mSBeautyUsersSuccess({ data: users })
          }),
          catchError((error) => of(UserActions.mSBeautyUsersFailure({ error: 'Error loading client' })))
        )
    })
  ));

  createUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.mSBeautyCreateUser),
    switchMap(({ data }) => {
      return this.userService.create(data)
        .pipe(
          map((user) => {
            return UserActions.mSBeautyCreateUserSuccess({ data: user })
          }),
          catchError((error) => of(UserActions.mSBeautyCreateUserFailure({ error: 'Error when create client' })))
        )
    })
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(UserActions.mSBeautyUpdateUser),
    switchMap(({ data }) => {
      return this.userService.update(data)
        .pipe(
          map((isUpdated) => {
            if (!isUpdated) {
              return UserActions.mSBeautyUpdateUserFailure({ error: 'Error when update client' });
            }

            return UserActions.mSBeautyUpdateUserSuccess({ data })
          }),
          catchError((error) => of(UserActions.mSBeautyUpdateUserFailure({ error: 'Error when update client' })))
        )
    })
  ));
}
