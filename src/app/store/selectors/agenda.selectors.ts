import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { agendaFeatureKey, AgendaState } from '../reducers/agenda.reducer';

const selecAgendaState: MemoizedSelector<object, AgendaState> = createFeatureSelector<AgendaState>(agendaFeatureKey)

export const selectAgendas = createSelector(
  selecAgendaState,
  (state: AgendaState) => state.data || []
);