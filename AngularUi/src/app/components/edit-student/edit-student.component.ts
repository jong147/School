import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/student.service';
import { AsyncValidator, Validator } from 'fluentvalidation-ts'
import { AbstractControl, FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { StudentValidator } from 'src/app/validators/student-validator';


@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  studentForm: FormGroup = new FormGroup({});
  validator: StudentValidator = new StudentValidator();

  formErrors: any = {
    'id': '',
    'firstname': '',
    'lastname': '',
    'contactnumber': '',
    'emailaddress': ''
  };

  //bind validator function to firstName input field on value change

  // firstNameControl? = new FormControl('', this.validateStudent('','','','',''));

  @Input() student?: Student;
  @Output() studentsUpdated: EventEmitter<Student[]> = new EventEmitter<Student[]>();

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {

  }

  addStudent(student?: Student) {
    this.studentService
      .addStudent(student!)
      .subscribe((students: Student[]) => this.studentsUpdated
        .emit(students));
  }

  updateStudent(student?: Student) {
    this.studentService
      .updateStudent(student!)
      .subscribe((students: Student[]) => this.studentsUpdated
        .emit(students));
  }

  deleteStudent(student?: Student) {
    this.studentService
      .deleteStudent(student!)
      .subscribe((students: Student[]) => this.studentsUpdated
        .emit(students));
  }

  validateStudent(Id: Student["id"], FirstName: Student["firstName"], LastName: Student["lastName"], ContactNumber: Student["contactNumber"], EmailAddress: Student["emailAddress"]): ValidationErrors | null {
    var resultPromise = ValidateStudentFunction(this.validator, Id, FirstName, LastName, ContactNumber, EmailAddress);

    var resultVar: ValidationErrors | null = resultPromise;
    console.log(resultVar);

    if (resultVar != null || resultVar != undefined) {
      resultPromise.then((result) => {
          this.formErrors.id = result!['id'] || '';
          this.formErrors.firstname = result!['firstName'] || '';
          this.formErrors.lastname = result!['lastName'] || '';
          this.formErrors.contactnumber = result!['contactNumber'] || '';
          this.formErrors.emailaddress = result!['emailAddress'] || '';
      });
    } else {
      this.formErrors.id = '';
      this.formErrors.firstname = '';
      this.formErrors.lastname = '';
      this.formErrors.contactnumber = '';
      this.formErrors.emailaddress = '';
    }

    console.log(this.formErrors);
    return resultVar;
  }

  hasErrors(obj: any): boolean {
    for (const key in obj) {
      if (typeof obj[key] === 'string' && obj[key].trim() !== '') {
        return false;
      }
    }
    return true;
  }

}

async function ValidateStudentFunction(validator: StudentValidator, Id?: Student["id"], FirstName?: Student["firstName"], LastName?: Student["lastName"], ContactNumber?: Student["contactNumber"], EmailAddress?: Student["emailAddress"]) {
  const result = await validator.validateAsync({ id: Id!, firstName: FirstName!, lastName: LastName!, contactNumber: ContactNumber!, emailAddress: EmailAddress! });
  return result as ValidationErrors | null;
}