import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgendaService } from 'src/app/core/services/agenda.service';

@Component({
  selector: 'msb-date-agenda',
  templateUrl: './date-agenda.component.html',
  styleUrls: ['./date-agenda.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateAgendaComponent implements OnInit {
  @Input()
  customerId!: number;

  @Input()
  isNext: boolean = false;

  agendaDate!: Observable<string>;

  constructor(
    private agendaService: AgendaService,
  ) { }

  ngOnInit(): void {
    this.getAgendaDate();
  }

  getAgendaDate(): void {
    const filter = {
      isNext: this.isNext,
      customerId: this.customerId
    }

    this.agendaDate = this.agendaService.getLastOrNextMeetDate(filter);
  }
}
