import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models';

@Component({
  selector: 'msb-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent {
  data: Item;
  itemForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) data: Item,
    private formBuilder: FormBuilder
  ) {
    this.data = data;
    this.itemForm = this.formBuilder.group({
      label: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.itemForm.patchValue(this.data);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.itemForm.invalid) return;

    const payload = this.itemForm.value;
    this.dialogRef.close(payload);
  }
}
