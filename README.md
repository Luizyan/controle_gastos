# Controle de Gastos Residenciais

Sistema web para gerenciamento de pessoas, transações e consulta de receitas, despesas e saldo.

## Tecnologias

### Backend
- C#
- .NET
- ASP.NET Core
- Entity Framework Core
- PostgreSQL

### Frontend
- React
- TypeScript
- Vite
- Axios

## Funcionalidades

- Cadastro, listagem e remoção de pessoas
- Cadastro e listagem de transações
- Remoção em cascata das transações ao excluir uma pessoa
- Validação para impedir receitas de menores de 18 anos
- Consulta de totais por pessoa e total geral

## Como executar

### Backend

```bash
cd backend
dotnet restore
dotnet ef database update
dotnet run
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Banco de dados

Configure a string de conexão no arquivo `backend/appsettings.json` e execute as migrações com:

```bash
dotnet ef database update
```
