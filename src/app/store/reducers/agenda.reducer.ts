import { createReducer, on } from '@ngrx/store';
import { Agenda } from 'src/app/models/agenda';
import * as AgendaActions from '../actions/agenda.actions';

export const agendaFeatureKey = 'agenda';

export interface AgendaState {
  loading: boolean;
  data: Agenda[];
  error: string;
}

export const initialState: AgendaState = {
  loading: false,
  data: [],
  error: ''
};

export const reducer = createReducer(
  initialState,
  on(
    AgendaActions.mSBeautyAgenda,
    AgendaActions.mSBeautyCreateAgenda,
    AgendaActions.mSBeautyDeleteAgenda,
    (state) => ({
      ...state,
      loading: true
    })
  ),
  on(
    AgendaActions.mSBeautyAgendaFailure,
    AgendaActions.mSBeautyCreateAgendaFailure,
    AgendaActions.mSBeautyDeleteAgendaFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: error
    })
  ),
  on(
    AgendaActions.mSBeautyAgendaSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data,
    })
  ),
  on(
    AgendaActions.mSBeautyCreateAgendaSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      data: [...state.data, data]
    })
  ),
  on(
    AgendaActions.mSBeautyDeleteAgendaSuccess,
    (state, { id }) => ({
      ...state,
      loading: false,
      data: [...state.data.filter(item => item.id != id)],
    })
  )
);
