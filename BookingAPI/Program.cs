using System.Text.Json.Serialization;
using BookingAPI.Data;
using BookingAPI.Services;
using Microsoft.EntityFrameworkCore;

// http://localhost:5106/swagger/index.html

var commandArgs = args ?? new string[] { };

var profile = commandArgs.Length > 0 ? commandArgs[0] : "";

Console.WriteLine($"Profile: {profile}");

var IsDocker = profile.Contains("Docker");
var connectionStringName = IsDocker ? "DockerConnection" : "DefaultConnection";


var builder = WebApplication.CreateBuilder(commandArgs);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

// Register Library Service to use it with Dependency Injection in Controller
builder.Services.AddTransient<ICustomerService, CustomerService>();
builder.Services.AddTransient<IHotelService, HotelService>();
builder.Services.AddTransient<IReservationService, ReservationService>();

builder.Services.AddControllers().AddJsonOptions(x =>
    x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);

// Register databases
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString(connectionStringName));
});
builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || IsDocker)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("corsapp");

app.UseAuthorization();

app.MapControllers();

app.Run();