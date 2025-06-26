using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tic_Tac_Toe_API.Data;
using Tic_Tac_Toe_API.Models;

namespace Tic_Tac_Toe_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultadosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResultadosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> PostResultado([FromBody] Resultado resultado)
        {
            _context.Resultados.Add(resultado);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(PostResultado), new { id = resultado.Id }, resultado);
        }

        [HttpGet("ultimos")]
        public async Task<ActionResult<IEnumerable<Resultado>>> GetUltimosVencedores()
        {
            return await _context.Resultados
                .Where(r => r.Vencedor != "E") // E = Empate
                .OrderByDescending(r => r.DataHora)
                .Take(10)
                .ToListAsync();
        }
    }
}
