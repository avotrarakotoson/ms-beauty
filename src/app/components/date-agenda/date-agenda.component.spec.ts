import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAgendaComponent } from './date-agenda.component';

describe('DateAgendaComponent', () => {
  let component: DateAgendaComponent;
  let fixture: ComponentFixture<DateAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateAgendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
