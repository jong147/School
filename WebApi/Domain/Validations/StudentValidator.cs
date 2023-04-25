using Domain.Students;
using FluentValidation;

namespace Domain.Validations
{
    public class StudentValidator : AbstractValidator<Student>
    {
        public StudentValidator()
        {

        RuleFor(x => x.FirstName)
        .NotEmpty()
        .WithMessage("First name is required")
        .MinimumLength(2)
        .WithMessage("First name must be at least 2 characters long")
        .MaximumLength(30)
        .WithMessage("First name must be at most 30 characters long");

        RuleFor(x => x.LastName)
        .NotEmpty()
        .WithMessage("Last name is required")
        .MinimumLength(2)
        .WithMessage("Last name must be at least 2 characters long")
        .MaximumLength(30)
        .WithMessage("Last name must be at most 30 characters long");

        RuleFor(x => x.ContactNumber)
        .NotEmpty()
        .WithMessage("Contact number is required")
        .Matches(@"^\d{10}$")
        .WithMessage("Contact number must be 10 digits long");

        RuleFor(x => x.EmailAddress)
        .NotEmpty()
        .WithMessage("Email address is required")
        .EmailAddress()
        .WithMessage("Email address must be a valid email address");

        }
    }
}
