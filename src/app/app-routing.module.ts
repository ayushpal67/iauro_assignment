import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';

const routes: Routes = [
  {
    path:'studentForm',
    component: StudentAddEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
