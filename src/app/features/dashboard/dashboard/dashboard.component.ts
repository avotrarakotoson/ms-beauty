import { PrestationSold } from 'src/app/models';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SoldPrestationState } from 'src/app/store/reducers/prestation-sales.reducer';
import { selectSoldPrestations } from 'src/app/store/selectors/prestation-sales.selectors';
import { mSBeautyPrestationSold } from 'src/app/store/actions/prestation-sales.actions';

@Component({
  selector: 'msb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  displayedColumns: string[] = ['date', 'prestation', 'item', 'fullname', 'price'];
  dataSource$: Observable<PrestationSold[]> = this.store.select(selectSoldPrestations);

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
