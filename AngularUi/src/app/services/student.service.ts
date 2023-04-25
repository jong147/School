import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  public getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>('https://localhost:7249/api/Student');
  }

  public addStudent(student: Student): Observable<Student[]> {
    return this.http.post<Student[]>('https://localhost:7249/api/Student', student);
  }

  public updateStudent(student: Student): Observable<Student[]> {
    return this.http.put<Student[]>('https://localhost:7249/api/Student', student);
  }

  public deleteStudent(student: Student): Observable<Student[]> {
    return this.http.delete<Student[]>('https://localhost:7249/api/Student/' + student.id);
  }

}
