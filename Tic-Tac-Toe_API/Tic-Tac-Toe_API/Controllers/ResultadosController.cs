using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Tic_Tac_Toe_API.Data;
using Tic_Tac_Toe_API.DTOs;
using Tic_Tac_Toe_API.Models;

namespace Tic_Tac_Toe_API.Controllers
{
    [ApiController]
    [Route("api/resultados")]
    public class ResultadosController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public ResultadosController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("ultimos")]
        public async Task<ActionResult<IEnumerable<ResultadoDTO>>> GetUltimos()
        {
            var resultados = await _context.Resultados
                .OrderByDescending(r => r.DataHora)
                .Take(10)
                .ToListAsync();

            return Ok(_mapper.Map<List<ResultadoDTO>>(resultados));
        }

        [HttpPost]
        public async Task<IActionResult> PostResultado(ResultadoDTO dto)
        {
            var resultado = _mapper.Map<Resultado>(dto);
            _context.Resultados.Add(resultado);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
