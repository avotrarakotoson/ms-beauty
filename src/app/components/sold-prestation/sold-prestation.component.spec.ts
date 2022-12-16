import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldPrestationComponent } from './sold-prestation.component';

describe('SoldPrestationComponent', () => {
  let component: SoldPrestationComponent;
  let fixture: ComponentFixture<SoldPrestationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoldPrestationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoldPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
