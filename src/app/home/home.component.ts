import { Component, NO_ERRORS_SCHEMA, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IStudent } from 'src/types/types';
import { StudentService } from '../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { StudentInfoComponent } from '../shared/components/student-info/student-info.component';
import { CreateStudentDialogComponent } from '../shared/components/create-student-dialog/create-student-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  classList: string[] = [];
  yearsList: string[] = [];
  filterForm: FormGroup;
  loading: boolean = false;
  isEditing: boolean = false;
  editableRowIndex: number | null = null;
  students: IStudent[] = [];
  studentsPresent: boolean = false;
  studentFormGroup: FormGroup;
  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    public dialog: MatDialog
  ) {
    this.studentFormGroup = this.fb.group({
      studentName: [null],
    });
    this.filterForm = this.fb.group({
      filterType: [null, Validators.required],
      year: [null],
      studentClass: [null],
    });

    // let filteredStudents: IStudent[] = [];
    // this.studentService.getAllStudents().subscribe((students) => {
    //   const k = students.filter((student) => {
    //     return (
    //       (!2019 || student.year === '2019') &&
    //       (!'Senior KG' || student.class === 'Senior KG')
    //     );
    //   });
    //   filteredStudents.push(...k);
    // });
    // this.studentsPresent = filteredStudents.length < 1;
    // this.students = filteredStudents;
  }

  updateClassOptions(): void {
    if (this.filterForm.get('filterType')?.value === 'primary') {
      this.classList = ['Junior KG', 'Senior KG', '1', '2', '3', '4'];
    } else if (this.filterForm.get('filterType')?.value === 'secondary') {
      this.classList = ['5', '6', '7', '8', '9'];
    } else {
      this.classList = [];
    }
    if (
      this.filterForm.get('filterType')?.value !== undefined &&
      this.filterForm.get('studentClass')?.value !== undefined
    ) {
      this.yearsList = ['2019', '2020', '2021', '2022'];
    }
  }

  private filterStudents(
    year: string | null,
    studentClass: string | null
  ): IStudent[] {
    let filteredStudents: IStudent[] = [];
    this.studentService.getAllStudents().subscribe((students) => {
      const k = students.filter((student) => {
        return (
          (!year || student.year === year) &&
          (!studentClass || student.class === studentClass)
        );
      });
      filteredStudents.push(...k);
    });
    this.studentsPresent = filteredStudents.length < 1;
    this.students = filteredStudents;
    return filteredStudents;
  }

  submitFilterForm(): void {
    this.students = [];
    if (this.filterForm.valid) {
      this.loading = true;
      setTimeout(() => {
        const selectedYear = this.filterForm.get('year')?.value;
        const selectedClass = this.filterForm.get('studentClass')?.value;
        this.students = this.filterStudents(selectedYear, selectedClass);
        this.loading = false;
      }, 1000);
    }
  }

  editStudentInfo(student: IStudent, index: number) {
    if (this.editableRowIndex === index) {
      this.editableRowIndex = null; // Close editing
    } else {
      this.editableRowIndex = index; // Open editing for the selected row
    }
  }

  saveEditedStudent(student: IStudent): void {
    this.students[this.editableRowIndex!].name = student.name;
    this.editableRowIndex = null;
  }

  openDialog(student: IStudent) {
    this.dialog.open(StudentInfoComponent, {
      data: {
        data: student,
      },
    });
  }

  openAddStudentDialog() {
    this.dialog.open(CreateStudentDialogComponent, {});
  }

  deleteStudent(index: number): void {
    console.log(this.students[index]);
    this.students = this.students.filter((_, i) => i !== index);
  }
}
