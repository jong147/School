using Domain.Students;
using FluentValidation;
using FluentValidation.Results;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly DatabaseContext database;

        public StudentController(DatabaseContext db) { database = db; }

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents()
        {
        return Ok(await database.Students.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Student>> GetStudent(string id)
        {
        return Ok(await database.Students.FindAsync(id));
        }

        [HttpPost]
        public async Task<ActionResult<List<Student>>> PostStudent(Student student, [FromServices] IValidator<Student> validator)
        {
        ValidationResult validationResult = validator.Validate(student);
        if (!validationResult.IsValid)
        {
        var modelStateDictionary = new ModelStateDictionary();
        foreach (var error in validationResult.Errors)
        {
        modelStateDictionary.AddModelError(error.PropertyName, error.ErrorMessage);
        }
        return ValidationProblem(modelStateDictionary);
        }

        database.Students.Add(student);
        await database.SaveChangesAsync();
        return Ok(await database.Students.ToListAsync());
        }

        [HttpPut]
        public async Task<ActionResult<List<Student>>> PutStudent(Student updatedStudent, [FromServices] IValidator<Student> validator)
        {
        var student = await database.Students.FindAsync(updatedStudent.Id);
        if (student == null)
        {
        return BadRequest("The student is not in the database.");
        }

        ValidationResult validationResult = validator.Validate(student);
        if (!validationResult.IsValid)
        {
        var modelStateDictionary = new ModelStateDictionary();
        foreach (var error in validationResult.Errors)
        {
        modelStateDictionary.AddModelError(error.PropertyName, error.ErrorMessage);
        }
        return ValidationProblem(modelStateDictionary);
        }

        student.FirstName = updatedStudent.FirstName;
        student.LastName = updatedStudent.LastName;
        student.ContactNumber = updatedStudent.ContactNumber;
        student.EmailAddress = updatedStudent.EmailAddress;
        await database.SaveChangesAsync();
        return Ok(await database.Students.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<Student>>> DeleteStudent(string id)
        {
        var student = await database.Students.FindAsync(id);
        if (student == null)
        {
        return BadRequest("The student is not in the database.");
        }
        database.Students.Remove(student);
        await database.SaveChangesAsync();
        return Ok(await database.Students.ToListAsync());

        }

    }
}
