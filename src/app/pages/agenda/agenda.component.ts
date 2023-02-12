import { selectAgendas } from 'src/app/store/selectors/agenda.selectors';
import { mSBeautyAgenda } from 'src/app/store/actions/agenda.actions';
import { DatePipe } from '@angular/common';
import { mSBeautyCreateAgenda } from 'src/app/store/actions/agenda.actions';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { Observable, of, firstValueFrom } from 'rxjs';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {MatAccordion} from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddReservationComponent } from 'src/app/components/add-reservation/add-reservation.component';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';
import { CreateAgendaDto } from 'src/app/core/dtos/agenda.dto';

const EVENTS = [
  {
    title: 'Prestation 2',
    date: '2023-01-13',
    fullName: 'Kin Feore'
  },
  {
    title: 'Prestation 2',
    date: '2023-01-14',
    fullName: 'Lyndell Mallabund'
  },
  {
    title: 'Prestation 3',
    date: '2023-01-14',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 4',
    date: '2023-01-15',
    fullName: 'Gray Metzke'
  },
  {
    title: 'Prestation 5',
    date: '2023-01-15',
    fullName: 'Farrah Maddison'
  },
  {
    title: 'Prestation 6',
    date: '2023-01-15',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 7',
    date: '2023-01-16',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 8',
    date: '2023-01-16',
    fullName: 'Mirella Goodliffe'
  },
  {
    title: 'Prestation 9',
    date: '2023-01-16',
    fullName: 'Nelli Wellsman'
  },
  {
    title: 'Prestation 10',
    date: '2023-01-20',
    fullName: 'Davita Winship'
  },
]

@Component({
  selector: 'msb-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AgendaComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [interactionPlugin, dayGridPlugin, listPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'title',
      center: '',
      right: 'prev,today,next dayGridMonth,timeGridWeek'
    },
    aspectRatio: 2,
    height: '100%',
    stickyHeaderDates: true,
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: true
    },
    eventDidMount: (arg) => {
      if (arg.isFuture) {
        arg.el.style.background = '#277BC0';
      } else if (arg.isToday) {
        arg.el.style.background = 'green';
      } else {
        arg.el.style.background = '#10A19D';
      }
    },
  };

  agendas$: Observable<any> = this.store.select(selectAgendas);

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  constructor(
    public dialog: MatDialog,
    private store: Store<PrestationState|CustomerState>,
    private datePipe: DatePipe,
    private cd: ChangeDetectorRef
  ) {
    this.calendarOptions.eventContent = (renderProps) => {
      const html = `
        <div style="padding: 0 10px; color: #fff">
          <div>${ renderProps.timeText }</div>
          <div>${ renderProps.event.title }</div>
          <div>${ renderProps.event.extendedProps['fullName'] }</div>
        <div>
      `;

      return { html };
    }
  }

  ngOnInit(): void {
    this.store.dispatch(mSBeautyAgenda());
  }

  addReservationModal() {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;

      if (item) {
        // TO DO
        const payload: CreateAgendaDto = {
          agendaDate: this.datePipe.transform(item.agendaDate, 'YYYY-MM-dd') ?? '',
          customerId: item.customerId,
          comment: item.comment,
          prestations: item.prestations.map((prestation: any) => {
            return {
              title: prestation.title,
              items: prestation.items,
            };
          })
        };

        this.store.dispatch(mSBeautyCreateAgenda({ data: payload }));
      }
    });
  }
}
