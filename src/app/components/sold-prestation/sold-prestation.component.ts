import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'msb-sold-prestation',
  templateUrl: './sold-prestation.component.html',
  styleUrls: ['./sold-prestation.component.scss']
})
export class SoldPrestationComponent {
  fullName: string;
  amount: number;
  currency: string;
  reduction: number;

  constructor(
    public dialogRef: MatDialogRef<SoldPrestationComponent>,
    @Inject(MAT_DIALOG_DATA) data: { fullName: string, amount: number, currency: string, reduction: number },
  ) {
    this.fullName = data.fullName;
    this.amount = data.amount;
    this.currency = data.currency;
    this.reduction = data.reduction;
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(true);
  }
}
