using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Domain.Students;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents()
        {
        return new List<Student>
            {
                new Student("1", "John", "Doe", "123-456-7890", "jdoe@gmail.com")
            };
        }
    }
}
