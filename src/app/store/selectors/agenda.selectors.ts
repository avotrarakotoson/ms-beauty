import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { agendaFeatureKey, AgendaState } from '../reducers/agenda.reducer';

const selesAgendaState: MemoizedSelector<object, AgendaState> = createFeatureSelector<AgendaState>(agendaFeatureKey)

export const selectAgendas = createSelector(
  selesAgendaState,
  (state: AgendaState) => state.data || []
);
