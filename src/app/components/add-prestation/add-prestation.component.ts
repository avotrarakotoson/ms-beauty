import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CreatePrestationDto } from 'src/app/core/dtos/prestation.dto';
import { Prestation, Item } from 'src/app/models';
import { ItemState } from 'src/app/store/reducers/item.reducer';
import { selectItems } from 'src/app/store/selectors/item.selectors';

@Component({
  selector: 'msb-add-prestation',
  templateUrl: './add-prestation.component.html',
  styleUrls: ['./add-prestation.component.scss']
})
export class AddPrestationComponent {
  data: Prestation;
  prestationForm: FormGroup;
  services$: Observable<Item[]> = this.store.select(selectItems);

  constructor(
    private store: Store<ItemState>,
    public dialogRef: MatDialogRef<AddPrestationComponent>,
    @Inject(MAT_DIALOG_DATA) data: Prestation,
    private formBuilder: FormBuilder
  ) {
    this.data = data;
    this.prestationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      items: [[], Validators.required],
      rate: [0, Validators.required],
      currency: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.prestationForm.patchValue(this.data);
      this.prestationForm.get('rate')?.setValue(this.data.rate)
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.prestationForm.invalid) return;

    const payload: CreatePrestationDto = this.prestationForm.value;
    this.dialogRef.close(payload);
  }
}
