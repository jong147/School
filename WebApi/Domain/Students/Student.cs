namespace Domain.Students
{
    public class Student
    {
        public string Id { get; set; } = String.Empty;
        public string FirstName { get; set; } = String.Empty;
        public string LastName { get; set; } = String.Empty;
        public string ContactNumber { get; set; } = String.Empty;
        public string EmailAddress { get; set; } = String.Empty;

        public Student() { }

        public Student(string id, string firstName, string lastName, string contactNumber, string emailAddress)
        {
            Id = id;
            FirstName = firstName;
            LastName = lastName;
            ContactNumber = contactNumber;
            EmailAddress = emailAddress;
        }

        public override string ToString()
        {
            return $"{Id} {FirstName} {LastName} {ContactNumber} {EmailAddress}";
        }

    }
}
