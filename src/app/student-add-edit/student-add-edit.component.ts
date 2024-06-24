import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StudentServicesService } from '../Services/student-services.service';
import { CoreServiceService } from '../Core/core-service.service';

@Component({
  selector: 'app-student-add-edit-action',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.scss']
})
export class StudentAddEditComponent implements OnInit{

  studentForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _studentService: StudentServicesService,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreServiceService
  ) {
    this.studentForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
    });
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.studentForm.valid) {
      if (this.data) {
        this._studentService
          .updateStudent(this.data.id, this.studentForm.value)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Student detail updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this._studentService.addStudent(this.studentForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Student added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
