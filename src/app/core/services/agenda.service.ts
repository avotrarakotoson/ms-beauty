import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api';
import { from, map, Observable } from 'rxjs';
import { Agenda, AgendaFromCmd } from 'src/app/models';
import { CreateAgendaDto } from '../dtos/agenda.dto';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  getAll(): Observable<Agenda[]> {
    return from(invoke('get_all_agendas'))
      .pipe(
        map((results: any) => {
          const agendasFromCmd: AgendaFromCmd[] = JSON.parse(results)

          return agendasFromCmd.map(agendaFromCmd => {
            const { agenda_date, customer_id, full_name, prestations, ...data } = agendaFromCmd;

            return Object.assign(data, {
              date: agenda_date,
              customerId: customer_id,
              fullName: full_name,
              prestations: prestations.map(prestation => {
                const { agenda_id, ...originItem } = prestation;
                return originItem;
              })
            });
          })
        })
      )
  }

  getAllByCustomerId(id: number): Observable<Agenda[]> {
    return from(invoke('get_all_agenda_by_customer_id', { id }))
      .pipe(
        map((result: any) => {
          const agendas: AgendaFromCmd[] = JSON.parse(result);

          return agendas.map(agenda => {
            const { agenda_date, customer_id, full_name, prestations, ...data } = agenda;

            return Object.assign(data, {
              date: agenda_date,
              customerId: customer_id,
              fullName: full_name,
              prestations: prestations.map(prestation => {
                const { agenda_id, ...item } = prestation;
                return item;
              })
            });
          })
        })
      )
  }

  getOne(id: number): Observable<Agenda> {
    return from(invoke('get_agenda', { id }))
      .pipe(
        map((result: any) => {
          const agendaFromCmd: AgendaFromCmd = JSON.parse(result);

          const { agenda_date, customer_id, full_name, prestations, ...data } = agendaFromCmd;
          return Object.assign(data, {
            date: agenda_date,
            customerId: customer_id,
            fullName: full_name,
            prestations: prestations.map(prestation => {
              const { agenda_id, ...originItem } = prestation;
              return originItem;
            })
          });
        })
      )
  }

  create(payload: CreateAgendaDto): Observable<Agenda> {
    console.log('Create...');

    return from(invoke('create_agenda', {
      payload : {
        agenda_date: payload.agendaDate,
        comment: payload.comment,
        customer_id: payload.customerId,
        prestations: payload.prestations.map(prestation => {
          return {
            title: prestation.title,
            items: prestation.items.join(', '),
          };
        }),
      },
    }))
    .pipe(
      map((result: any) => {
        const agendaFromCmd: AgendaFromCmd = JSON.parse(result);

        const { agenda_date, customer_id, full_name, prestations, ...data } = agendaFromCmd;
        return Object.assign(data, {
          date: agenda_date,
          customerId: customer_id,
          fullName: full_name,
          prestations: prestations.map(prestation => {
            const { agenda_id, ...originItem } = prestation;
            return originItem;
          })
        });
      })
    )
  }

  delete(id: number): Observable<boolean> {
    return from(invoke('delete_agenda', { id }))
      .pipe(
        map((result: any) => {
          return result === 'true';
        })
      )
  }
}
