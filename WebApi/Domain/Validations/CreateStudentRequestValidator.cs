using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Domain.Students;

namespace Domain.Validations
{
    public class CreateStudentRequestValidator : AbstractValidator<Student>
    {
        public CreateStudentRequestValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("First name is required.");
            RuleFor(x => x.FirstName).Must(x => x.Length > 2 && x.Length < 30).WithMessage("First name must be between 2 and 30 characters.");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Last name is required.");
            RuleFor(x => x.ContactNumber).NotEmpty().WithMessage("Contact number is required.");
            RuleFor(x => x.EmailAddress).NotEmpty().WithMessage("Email address is required.");
        }
    }
    
    
}
