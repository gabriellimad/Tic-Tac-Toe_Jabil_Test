using Moq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using Tic_Tac_Toe_API.Controllers;
using Tic_Tac_Toe_API.Data;
using Tic_Tac_Toe_API.DTOs;
using Tic_Tac_Toe_API.Models;

public class ResultadosControllerTests
{
    private Mock<IMapper> _mapperMock;

    private AppDbContext CreateDbContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString()) // banco único para cada teste
            .Options;

        return new AppDbContext(options);
    }

    [Fact]
    public async Task GetUltimos_ReturnsOk_WithLast10Results()
    {
        // Arrange
        var context = CreateDbContext();

        // Inserir 15 resultados (sem definir Id)
        for (int i = 1; i <= 15; i++)
        {
            context.Resultados.Add(new Resultado { Vencedor = "X", DataHora = System.DateTime.Now.AddMinutes(-i) });
        }
        await context.SaveChangesAsync();

        _mapperMock = new Mock<IMapper>();
        _mapperMock.Setup(m => m.Map<List<ResultadoDTO>>(It.IsAny<List<Resultado>>()))
            .Returns((List<Resultado> src) => src.Select(r => new ResultadoDTO { Vencedor = r.Vencedor, DataHora = r.DataHora }).ToList());

        var controller = new ResultadosController(context, _mapperMock.Object);

        // Act
        var result = await controller.GetUltimos();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result.Result);
        var returnList = Assert.IsType<List<ResultadoDTO>>(okResult.Value);

        Assert.Equal(10, returnList.Count); // só 10 resultados
        Assert.True(returnList[0].DataHora > returnList[9].DataHora); // ordem decrescente
    }

    [Fact]
    public async Task PostResultado_SavesResultAndReturnsOk()
    {
        // Arrange
        var context = CreateDbContext();

        _mapperMock = new Mock<IMapper>();
        var dto = new ResultadoDTO { Vencedor = "O", DataHora = System.DateTime.Now };

        _mapperMock.Setup(m => m.Map<Resultado>(dto))
            .Returns(new Resultado { Vencedor = dto.Vencedor, DataHora = dto.DataHora });

        var controller = new ResultadosController(context, _mapperMock.Object);

        // Act
        var result = await controller.PostResultado(dto);

        // Assert
        Assert.IsType<OkResult>(result);

        var saved = context.Resultados.FirstOrDefault(r => r.Vencedor == "O");
        Assert.NotNull(saved);
        Assert.Equal(dto.Vencedor, saved.Vencedor);
    }
}