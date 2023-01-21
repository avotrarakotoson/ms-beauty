import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { Observable, of } from 'rxjs';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import {MatAccordion} from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AddReservationComponent } from 'src/app/components/add-reservation/add-reservation.component';
import { CustomerState } from 'src/app/store/reducers/customer.reducer';

const EVENTS = [
  {
    title: 'Prestation 2',
    start: '2022-12-18T08:30:00',
    end: '2022-12-21T10:30:00',
    fullName: 'Kin Feore'
  },
  {
    title: 'Prestation 2',
    start: '2022-12-21T09:30:00',
    end: '2022-12-21T10:30:00',
    fullName: 'Lyndell Mallabund'
  },
  {
    title: 'Prestation 3',
    start: '2022-12-22T11:30:00',
    end: '2022-12-22T10:30:00',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 4',
    start: '2022-12-23T08:30:00',
    end: '2022-12-23T10:30:00',
    fullName: 'Gray Metzke'
  },
  {
    title: 'Prestation 5',
    start: '2022-12-23T15:30:00',
    end: '2022-12-23T13:00:00',
    fullName: 'Farrah Maddison'
  },
  {
    title: 'Prestation 6',
    start: '2022-12-24T11:30:00',
    end: '2022-12-24T10:30:00',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 7',
    start: '2022-12-25T09:30:00',
    end: '2022-12-25T10:30:00',
    fullName: 'Davita Winship'
  },
  {
    title: 'Prestation 8',
    start: '2022-12-26T08:30:00',
    end: '2022-12-26T10:30:00',
    fullName: 'Mirella Goodliffe'
  },
  {
    title: 'Prestation 9',
    start: '2022-12-27T14:30:00',
    end: '2022-12-27T10:30:00',
    fullName: 'Nelli Wellsman'
  },
  {
    title: 'Prestation 10',
    start: '2022-12-28T09:30:00',
    end: '2022-12-28T10:30:00',
    fullName: 'Davita Winship'
  },
]

const USERS = [
  {
    id: 1,
    fullName: 'Davita Winship',
    phoneNumber: '+231 34 534 33',
    history: [
      {
        id: 1,
        date: '2022-09-12',
        title: "Prestation 1",
        items: ["Shampooing", "Soins", "Brushung"],
      },
      {
        id: 2,
        date: '2022-10-02',
        title: "Prestation 2",
        items: ["Shampooing", "Soins", "Coupe", "Brushung"],
      },
      {
        id: 6,
        date: '2022-10-08',
        title: "Prestation 6",
        items: ["Couleur", "Meches", "Shampooing", "Soins", "Coupe", "Brushung"],
      },
    ]
  },
  {
    id: 2,
    fullName: 'Farrah Maddison',
    phoneNumber: '+231 32 221 43',
    history: [
      {
        id: 2,
        date: '2022-10-02',
        title: "Prestation 2",
        items: ["Shampooing", "Soins", "Coupe", "Brushung"],
      },
      {
        id: 14,
        date: '2022-10-12',
        title: "Prestation 14",
        items: ["Permanente"],
      },
    ]
  },
]

@Component({
  selector: 'msb-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgendaComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, listPlugin, timeGridPlugin],
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

  events$: Observable<any> = of(EVENTS);
  users = USERS;

  @ViewChild(MatAccordion) accordion: MatAccordion | undefined;
  constructor(
    public dialog: MatDialog,
    private store: Store<PrestationState|CustomerState>
  ) {
    this.calendarOptions.eventContent = (renderProps) => {
      const html = `
        <div style="padding: 0 10px; color: #fff">
          <div>${ renderProps.timeText }</div>
          <div>${ renderProps.event.title }</div>
          <div>${ this.getFullName(renderProps.event.extendedProps['fullName']) }</div>
        <div>
      `;

      return { html };
    }
  }

  getFullName(value: string | undefined): string {
    if (!value) return '';

    return value;
  }

  addReservationModal() {
    const dialogRef = this.dialog.open(AddReservationComponent, {
      width: '800px',
      height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;

      if (item) {
        // TO DO
      }
    });
  }
}