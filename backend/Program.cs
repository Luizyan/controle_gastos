using backend.Data;
using backend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// 1. Registra a política de CORS liberando o React (Vite)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:5173") // URL do seu frontend React
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Configura o suporte para Controllers
builder.Services.AddControllers();

// Conecta ao PostgreSQL usando a Connection String do appsettings.json
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Altera para AddScoped (Cria uma instância do serviço por requisição HTTP)
builder.Services.AddScoped<FinanceiroService>();

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/openapi/v1.json", "Desafio Estágio API v1");
    });
}

// 2. Ativa o middleware do CORS (DEVE ficar ANTES do HttpsRedirection/Authorization/MapControllers)
app.UseCors("AllowReactApp");

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();