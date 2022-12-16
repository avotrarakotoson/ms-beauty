import { createAction, props } from '@ngrx/store';
import { CreateUserDto, UpdateUserDto } from 'src/app/core/dtos/user.dto';
import { User } from 'src/app/models';

export const mSBeautyUsers = createAction(
  '[User] MSBeauty Users'
);

export const mSBeautyUsersSuccess = createAction(
  '[User] MSBeauty Users Success',
  props<{ data: User[] }>()
);

export const mSBeautyUsersFailure = createAction(
  '[User] MSBeauty Users Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreateUser = createAction(
  '[User] MSBeauty Create User',
  props<{ data: CreateUserDto }>()
);
export const mSBeautyCreateUserSuccess = createAction(
  '[User] MSBeauty Create User Success',
  props<{ data: User }>()
);
export const mSBeautyCreateUserFailure = createAction(
  '[User] MSBeauty Create User Failure',
  props<{ error: string }>()
);

// Update Action
export const mSBeautyUpdateUser = createAction(
  '[User] MSBeauty Update User',
  props<{ data: UpdateUserDto }>()
);
export const mSBeautyUpdateUserSuccess = createAction(
  '[User] MSBeauty Update User Success',
  props<{ data: UpdateUserDto }>()
);
export const mSBeautyUpdateUserFailure = createAction(
  '[User] MSBeauty Update User Failure',
  props<{ error: string }>()
);
