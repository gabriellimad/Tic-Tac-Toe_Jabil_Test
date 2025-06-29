# Tic Tac Toe API

API backend para o projeto Tic Tac Toe, construída com .NET 8, usando PostgreSQL e Entity Framework Core.

---

## Tecnologias Utilizadas

- .NET 8
- Entity Framework Core
- PostgreSQL
- AutoMapper
- Swagger (OpenAPI)
- xUnit + Moq para testes automatizados

---

## Estrutura do Projeto

- `Tic-Tac-Toe_API`: Projeto principal da API REST
- `Tic-Tac-Toe_API_Test`: Projeto de testes unitários

Caminho do projeto API: `Tic-Tac-Toe_Jabil_Test\Tic-Tac-Toe_API\Tic-Tac-Toe_API`

---

## Como Rodar a API

1. Certifique-se de ter o .NET 8 SDK instalado.
2. Configure a string de conexão com o PostgreSQL no `appsettings.json`.
3. Abra o terminal na pasta da API.
4. Execute o comando para aplicar as migrations e criar o banco:

dotnet ef database update
