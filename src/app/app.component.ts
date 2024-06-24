import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component'
import { StudentServicesService } from './Services/student-services.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreServiceService } from './Core/core-service.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _studentService: StudentServicesService,
    private _coreService: CoreServiceService
  ) {}

  ngOnInit(): void {
    this.getStudentList();
  }

  openAddEditStudentForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
  }

  getStudentList() {
    this._studentService.getStudentList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  deleteStudent(id: number) {
    this._studentService.deleteStudent(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Student deleted!', 'done');
        this.getStudentList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getStudentList();
        }
      },
    });
  }
}
