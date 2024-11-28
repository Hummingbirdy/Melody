using MelodyContext;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//var _connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var _connectionString = "Server=tcp:lemasterworks.database.windows.net,1433;Initial Catalog=MelodyDb;Persist Security Info=False;User ID=tlemaster;Password=Lexielm2;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

// Add services to the container.
builder.Services.AddDbContext<MelodyDbContext>(options =>
    options.UseSqlServer(_connectionString));

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
