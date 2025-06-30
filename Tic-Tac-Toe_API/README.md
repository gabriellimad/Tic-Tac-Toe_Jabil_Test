
# Tic-Tac-Toe_API

Projeto backend desenvolvido em .NET 8 para a API do jogo Tic-Tac-Toe.

## Estrutura do projeto

- Código-fonte da API: `Tic-Tac-Toe_Jabil_Test/Tic-Tac-Toe_API/Tic-Tac-Toe_API`
- Testes: `Tic-Tac-Toe_Jabil_Test/Tic-Tac-Toe_API/Tic-Tac-Toe_API_Test`

## Tecnologias utilizadas

- .NET 8
- Entity Framework Core com PostgreSQL
- AutoMapper
- Swagger para documentação e testes da API
- xUnit + Moq para testes unitários
- Visual Studio, utilizar o VS para rodar o projeto é mais intuitivo.

## Executando a aplicação localmente

- A API está configurada para rodar em HTTP por padrão (não HTTPS), para evitar problemas de certificado.
- A API está no caminho: Tic-Tac-Toe_Jabil_Test/Tic-Tac-Toe_API/Tic-Tac-Toe_API
- O projeto utiliza migrations do Entity Framework Core.
- A primeira vez que rodar o projeto, as tabelas serão criadas automaticamente se não existirem.
- Para aplicar as migrations manualmente, use o comando:
  ```
  dotnet ef database update
  ```
- Certifique-se de que o `appsettings.json` esteja configurado com a string de conexão correta para seu banco PostgreSQL.
- Para iniciar a API, execute:
  ```
  dotnet run
  ```
- Após o start, a documentação Swagger estará disponível em:
  ```
  http://localhost:5050/swagger/index.html
  ```
  onde 5050 é a porta configurada no projeto.

## Testes

- Os testes unitários estão localizados na pasta `Tic-Tac-Toe_Jabil_Test/Tic-Tac-Toe_API/Tic-Tac-Toe_API_Test`
- Para executar os testes, use o comando:
  ```
  dotnet test
  ```

## Observações

- O projeto está configurado para criar e manter o banco de dados via migrations automaticamente.
- Caso queira resetar o banco, apague o banco e rode `dotnet ef database update` novamente.
- O Swagger facilita o teste das rotas GET e POST da API diretamente pelo navegador.

---

Este README visa facilitar a configuração e execução do backend Tic-Tac-Toe para outros desenvolvedores e testes locais.
