import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IStudent } from 'src/types/types';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'],
})
export class StudentInfoComponent implements OnInit {
  student?: IStudent;
  displayedColumns: string[] = ['key', 'value'];
  dataSource: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  ngOnInit(): void {
    this.student = this.data.data;
    this.dataSource = this.student?.grades?.subjects;
  }

  public orderByKey(a: any, b: any) {
    return a.key;
  }
}
