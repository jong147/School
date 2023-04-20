import { Component } from '@angular/core';
import { Student } from './models/student';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularUi';
  students: Student[] = [];

  constructor(private studentService: StudentService) {
    /* this.students = this.studentService.getStudents(); */
  }

  ngOnInit(): void {
    
    this.studentService
    .getStudents()
    .subscribe((students: Student[]) => (this.students = students));

  }
  
}
