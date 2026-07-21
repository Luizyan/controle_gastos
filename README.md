# 💰 Controle de Gastos Residenciais

Sistema web desenvolvido para gerenciamento de pessoas, transações e consolidação de relatórios de receitas e despesas.

## 🚀 Tecnologias Utilizadas

### Backend
- **C# / .NET**
- **Entity Framework Core**
- **PostgreSQL**
- **Swagger / OpenAPI**

### Frontend
- **React + TypeScript**
- **Vite**
- **Axios**
- **CSS3 (Variáveis Globais)**

---

## ⚙️ Regras de Negócio Implementadas

1. **Gestão de Pessoas:** Cadastro, listagem e remoção em cascata (ao deletar uma pessoa, todas as suas transações são removidas).
2. **Gestão de Transações:** Cadastro e listagem. Validação automática impedindo o lançamento de **Receitas** para menores de 18 anos.
3. **Consulta de Totais:** Apresentação do total de receitas, despesas e saldo individual por pessoa, além do resumo consolidador com o saldo líquido geral de todos os cadastrados.

---

## 🛠️ Como Executar o Projeto

### Pré-requisitos
- **Node.js** (v18+)
- **.NET SDK** (v8+)
- **PostgreSQL**

### 1. Backend
```bash
cd backend
dotnet restore
dotnet run
