import { UpdateUserDto } from 'src/app/core/dtos/user.dto';
import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models';
import * as UserActions from '../actions/user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  loading: boolean;
  data: User[];
  error: string;
}

export const initialState: UserState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    UserActions.mSBeautyUsers,
    UserActions.mSBeautyCreateUser,
    UserActions.mSBeautyUpdateUser,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    UserActions.mSBeautyUsersFailure,
    UserActions.mSBeautyCreateUserFailure,
    UserActions.mSBeautyUpdateUserFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    UserActions.mSBeautyUsersSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    UserActions.mSBeautyCreateUserSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [...state.data, data],
    })
  ),
  on(
    UserActions.mSBeautyUpdateUserSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: updateUser(state.data, data),
    })
  )
);

const updateUser = (users: User[], value: UpdateUserDto): User[] => {
  const result = users.map(user => {
    if (user.id === value.id) {
      user = Object.assign({...user}, value);
    }

    return user;
  })

  return result;
}
