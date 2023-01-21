import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AgendaService } from 'src/app/core/services/agenda.service';
import * as AgendaActions from '../actions/agenda.actions';

@Injectable()
export class AgendaEffects {

  constructor(
    private actions$: Actions,
    private agendaService: AgendaService
  ) {}

  loadAgenda$ = createEffect(() => this.actions$.pipe(
    ofType(AgendaActions.mSBeautyAgenda),
    switchMap(() => {
      return this.agendaService.getAll()
        .pipe(
          map((agendas) => {
            return AgendaActions.mSBeautyAgendaSuccess({ data: agendas })
          }),
          catchError((error) => of(AgendaActions.mSBeautyAgendaFailure({ error: 'Error loading agenda' })))
        )
    })
  ));

  createAgenda$ = createEffect(() => this.actions$.pipe(
    ofType(AgendaActions.mSBeautyCreateAgenda),
    switchMap(({ data }) => {
      return this.agendaService.create(data)
        .pipe(
          map((agenda) => {
            return AgendaActions.mSBeautyCreateAgendaSuccess({ data: agenda })
          }),
          catchError((error) => of(AgendaActions.mSBeautyCreateAgendaFailure({ error: 'Error when create agenda' })))
        )
    })
  ));

  deleteAgenda$ = createEffect(() => this.actions$.pipe(
    ofType(AgendaActions.mSBeautyDeleteAgenda),
    switchMap(({ id }) => {
      return this.agendaService.delete(id)
        .pipe(
          map((isDeleted) => {
            if (!isDeleted) {
              return AgendaActions.mSBeautyDeleteAgendaFailure({ error: 'Error when delete agenda' })
            }

            return AgendaActions.mSBeautyDeleteAgendaSuccess({ id });
          }),
          catchError((error) => of(AgendaActions.mSBeautyDeleteAgendaFailure({ error: 'Error when delete agenda' })))
        )
    })
  ))
}
