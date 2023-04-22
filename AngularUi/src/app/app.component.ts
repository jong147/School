import { Component, OnInit } from '@angular/core';
import { Student } from './models/student';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AngularUi';
  students: Student[] = [];
  studentToEdit? : Student;

  constructor(private studentService: StudentService) {
  }

  ngOnInit(): void {
    this.studentService
    .getStudents()
    .subscribe((students: Student[]) => (this.students = students));
  }

  updateStudentList(students: Student[]) {
    this.students = students;
  }

  addNewStudent() {
    this.studentToEdit = new Student();
  }

  editStudent(student: Student) {
    this.studentToEdit = student;
  }

}


