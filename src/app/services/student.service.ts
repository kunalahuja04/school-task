import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IStudent } from 'src/types/types';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private _httpClient: HttpClient) {}

  getAllStudents() {
    return this._httpClient.get<IStudent[]>('https://mocki.io/v1/ea46c26f-c67f-478e-b89d-3483d8db9123');
  }
}
