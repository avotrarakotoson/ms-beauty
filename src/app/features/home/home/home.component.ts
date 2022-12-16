import { mSBeautyCreatePrestationSold } from './../../../store/actions/prestation-sales.actions';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SoldPrestationComponent } from 'src/app/components/sold-prestation/sold-prestation.component';
import { Prestation } from 'src/app/models';
import { Store } from '@ngrx/store';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';

@Component({
  selector: 'msb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  prestations$: Observable<Prestation[]> = this.store.select(selectPrestations);

  constructor(
    private store: Store<PrestationState>,
    public dialog: MatDialog
  ) {}

  soldPrestationModal(prestation: Prestation) {
    const dialogRef = this.dialog.open(SoldPrestationComponent, {
      data: prestation,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreatePrestationSold({ data: item }))
    });
  }
}
