import { AsyncValidator } from 'fluentvalidation-ts';
import { Student } from '../models/student';

export class StudentValidator extends AsyncValidator<Student> {
  constructor() {
    super();

    this.ruleFor('id')
      .notEmpty()
      .withMessage('Id is required')
      .matches(/^SCH[0-9]{4}$/)
      .withMessage('Id must be in the format SCH0000');

    this.ruleFor('firstName')
      .notEmpty()
      .withMessage('First name is required')
      .minLength(2)
      .withMessage('First name must be at least 2 characters long')
      .maxLength(30)
      .withMessage('First name must be at most 30 characters long');

    this.ruleFor('lastName')
      .notEmpty()
      .withMessage('Last name is required')
      .minLength(2)
      .withMessage('First name must be at least 2 characters long')
      .maxLength(30)
      .withMessage('First name must be at most 30 characters long');

    this.ruleFor('contactNumber')
      .notEmpty()
      .withMessage('Contact number is required')
      .matches(/^[0-9]{10}$/)
      .withMessage('Contact number must be 10 digits long');

    this.ruleFor('emailAddress')
      .notEmpty()
      .withMessage('Email address is required')
      .emailAddress()
      .withMessage('Email address must be a valid email address');

  }
}



