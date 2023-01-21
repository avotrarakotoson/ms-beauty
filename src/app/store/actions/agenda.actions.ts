import { createAction, props } from "@ngrx/store";
import { CreateAgendaDto } from "src/app/core/dtos/agenda.dto";
import { Agenda } from "src/app/models/agenda";

// Load Action
export const mSBeautyAgenda = createAction(
  '[Agenda] MSBeauty Agendas'
);
export const mSBeautyAgendaSuccess = createAction(
  '[Agenda] MSBeauty Agendas Success',
  props<{ data: Agenda[] }>()
);
export const mSBeautyAgendaFailure = createAction(
  '[Agenda] MSBeauty Agendas Failure',
  props<{ error: string }>()
);

// Create Action
export const mSBeautyCreateAgenda = createAction(
  '[Agenda] MSBeauty Create Agenda',
  props<{ data: CreateAgendaDto }>()
);
export const mSBeautyCreateAgendaSuccess = createAction(
  '[Agenda] MSBeauty Create Agenda Success',
  props<{ data: Agenda }>()
);
export const mSBeautyCreateAgendaFailure = createAction(
  '[Agenda] MSBeauty Create Agenda Failure',
  props<{ error: string }>()
);

// Delete Action
export const mSBeautyDeleteAgenda = createAction(
  '[Agenda] MSBeauty Delete Agenda',
  props<{ id: number }>()
);
export const mSBeautyDeleteAgendaSuccess = createAction(
  '[Agenda] MSBeauty Delete Agenda Success',
  props<{ id: number }>()
);
export const mSBeautyDeleteAgendaFailure = createAction(
  '[Agenda] MSBeauty Delete Agenda Failure',
  props<{ error: string }>()
);