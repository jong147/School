import { AsyncValidator } from 'fluentvalidation-ts';
import { Student } from '../models/student';

export class StudentValidator extends AsyncValidator<Student> {
  constructor() {
    super();

    this.ruleFor('id')
    .notEmpty()
    .withMessage('Id is required')
    //regex pattern beginning with SCH in that specific order followed by 4 digits
    .matches(/^SCH[0-9]{4}$/)
    .withMessage('Id must be in the format SCH0000');

    this.ruleFor('firstName')
    .notEmpty()
    .withMessage('First Name is required')
    .minLength(2)
    .withMessage('First Name must be at least 2 characters long')
    .maxLength(30)
    .withMessage('First Name must be at most 30 characters long');

    this.ruleFor('lastName')
    .notEmpty()
    .withMessage('Last Name is required')
    .minLength(2)
    .withMessage('First Name must be at least 2 characters long')
    .maxLength(30)
    .withMessage('First Name must be at most 30 characters long');

    this.ruleFor('contactNumber')
    .notEmpty()
    .withMessage('Contact Number is required')
    .matches(/^[0-9]{10}$/)
    .withMessage('Contact Number must be 10 digits long');

    this.ruleFor('emailAddress')
    .notEmpty()
    .withMessage('Email Address is required')
    .emailAddress()
    .withMessage('Email Address must be a valid email address');
    
  }
}



