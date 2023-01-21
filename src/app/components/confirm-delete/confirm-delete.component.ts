import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'msb-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  id: number;
  label: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data: { label: string, id: number },
  ) {
    this.id = data.id;
    this.label = data.label;
  }

  cancel() {
    this.dialogRef.close();
  }

  delete() {
    this.dialogRef.close(this.id);
  }
}
