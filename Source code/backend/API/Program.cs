using Microsoft.EntityFrameworkCore;
using KVCS.Context;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddDbContext<AccountContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("kvcs")));
builder.Services.AddDbContext<CustomerContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("kvcs")));
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
