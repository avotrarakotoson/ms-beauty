import { PrestationSold } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SoldPrestationState } from 'src/app/store/reducers/prestation-sales.reducer';
import { selectSoldPrestations } from 'src/app/store/selectors/prestation-sales.selectors';
import { mSBeautyPrestationSold } from 'src/app/store/actions/prestation-sales.actions';

@Component({
  selector: 'msb-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit{
  displayedColumns: string[] = ['date', 'fullname', 'prestation', 'price'];
  salesPrestations$: Observable<PrestationSold[]> = this.store.select(selectSoldPrestations);

  constructor(
    private store: Store<SoldPrestationState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(mSBeautyPrestationSold())
  }

  getItems(items: string[]): string {
    if (!items) return '';

    return items.join(', ');
  }
}
