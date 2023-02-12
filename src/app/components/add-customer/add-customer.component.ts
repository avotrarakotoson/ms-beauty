import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateCustomerDto } from 'src/app/core/dtos/customer.dto';
import { Customer } from 'src/app/models';

@Component({
  selector: 'msb-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  data: Customer;
  customerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddCustomerComponent>,
    @Inject(MAT_DIALOG_DATA) data: Customer,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.data = data;
    this.customerForm = this.formBuilder.group({
      firstName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [''],
      email: [''],
      primaryPhone: [''],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.customerForm.patchValue(this.data);
      this.customerForm.get('dob')?.setValue(new Date(this.data.dob));
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.customerForm.invalid) return;

    const payload: CreateCustomerDto = this.customerForm.value;
    payload.dob = this.datePipe.transform(payload.dob, 'MM/dd/YYYY') ?? '';

    this.dialogRef.close(payload);
  }
}
