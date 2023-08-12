import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { CreateStudentDialogComponent } from './components/create-student-dialog/create-student-dialog.component';

@NgModule({
  declarations: [NavbarComponent, StudentInfoComponent, CreateStudentDialogComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, FormsModule],
  exports: [ReactiveFormsModule, FormsModule, NavbarComponent, StudentInfoComponent, MaterialModule],
})
export class SharedModule {}
