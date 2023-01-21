import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddPrestationComponent } from 'src/app/components/add-prestation/add-prestation.component';
import { ConfirmDeleteComponent } from 'src/app/components/confirm-delete/confirm-delete.component';
import { UpdatePrestationDto } from 'src/app/core/dtos/prestation.dto';
import { Prestation } from 'src/app/models';
import { mSBeautyCreatePrestation, mSBeautyDeletePrestation, mSBeautyUpdatePrestation } from 'src/app/store/actions/prestation.actions';
import { PrestationState } from 'src/app/store/reducers/prestation.reducer';
import { selectPrestations } from 'src/app/store/selectors/prestation.selectors';

@Component({
  selector: 'msb-prestations',
  templateUrl: './prestations.component.html',
  styleUrls: ['./prestations.component.scss']
})
export class PrestationsComponent {
  displayedColumns: string[] = ['name', 'item', 'price', 'action'];
  prestations$: Observable<Prestation[]> = this.store.select(selectPrestations);

  constructor(
    public dialog: MatDialog,
    private store: Store<PrestationState>
  ) {}

  getItems(items: string[]): string {
    if (!items) return '';

    return items.join(', ');
  }

  addPrestationModal() {
    const dialogRef = this.dialog.open(AddPrestationComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item = result;
      this.store.dispatch(mSBeautyCreatePrestation({ data: item }))
    });
  }

  updatePrestationModal(prestation: Prestation) {
    const dialogRef = this.dialog.open(AddPrestationComponent, {
      data: prestation,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      const item: UpdatePrestationDto = Object.assign({...prestation}, result);
      this.store.dispatch(mSBeautyUpdatePrestation({ data: item }));
    });
  }

  deletePrestationModal(prestation: Prestation) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: { label: prestation.title, id: prestation.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(mSBeautyDeletePrestation({ id: result }));
      }
    });
  }
}
