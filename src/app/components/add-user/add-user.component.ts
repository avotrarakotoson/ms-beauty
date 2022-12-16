import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateUserDto } from 'src/app/core/dtos/user.dto';
import { User } from 'src/app/models';

@Component({
  selector: 'msb-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  data: User;
  userForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) data: User,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.data = data;
    this.userForm = this.formBuilder.group({
      firstName: [''],
      lastName: ['', Validators.required],
      gender: [],
      dob: [],
      email: [],
      primaryPhone: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    if (this.data) {
      this.userForm.patchValue(this.data);
      this.userForm.get('dob')?.setValue(new Date(this.data.dob));
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if (this.userForm.invalid) return;

    const payload: CreateUserDto = this.userForm.value;
    payload.dob = this.datePipe.transform(payload.dob, 'MM/dd/YYYY') ?? '';

    this.dialogRef.close(payload);
  }
}
