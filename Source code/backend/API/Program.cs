using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

using Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<UnitOfWork>();
builder.Services.AddSwaggerGen();


builder.Services.AddAuthentication(options => {
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer( token => {
    token.TokenValidationParameters = new TokenValidationParameters{
        ValidIssuer = builder.Configuration["Jwt::Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey( Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"] ?? string.Empty)),
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
    };
});

//Adding Authorization
//builder.Services.AddAuthorization(); //Used if no authorization policy required
builder.Services.AddAuthorizationBuilder().AddPolicy("staff_policy", policy => policy.RequireRole("staff"));
builder.Services.AddAuthorizationBuilder().AddPolicy("manager_policy", policy => policy.RequireRole("manager"));
builder.Services.AddAuthorizationBuilder().AddPolicy("customer_policy", policy => policy.RequireRole("customer"));
builder.Services.AddAuthorizationBuilder().AddPolicy("vet_policy", policy => policy.RequireRole("vet"));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
