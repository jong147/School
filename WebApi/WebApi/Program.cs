using Domain;
using FluentValidation;
using Infrastructure;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
// Add CORS policy so that the Angular client can access the API
builder.Services.AddCors(options => options.AddPolicy(name: "AngularOrigins",
policy =>
{
    policy.WithOrigins("http://localhost:4200", "http://localhost:4200/",
    "https://localhost:4200").AllowAnyMethod().AllowAnyHeader();
}));
// Add the database context for Entity Framework Core
builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(ConnectionStrings.ConnString);
});

// Add the Fluent Validation service
builder.Services.AddValidatorsFromAssemblyContaining<IAssemblyMarker>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
app.UseSwagger();
app.UseSwaggerUI();
}

app.UseCors("AngularOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
