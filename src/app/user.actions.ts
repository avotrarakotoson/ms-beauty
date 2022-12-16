import { createAction, props } from '@ngrx/store';

export const mSUsers = createAction(
  '[User] MS Users'
);

export const mSUsersSuccess = createAction(
  '[User] MS Users Success',
  props<{ data: any }>()
);

export const mSUsersFailure = createAction(
  '[User] MS Users Failure',
  props<{ error: any }>()
);
