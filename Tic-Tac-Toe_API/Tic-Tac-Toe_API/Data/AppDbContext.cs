using Microsoft.EntityFrameworkCore;
using Tic_Tac_Toe_API.Models;

namespace Tic_Tac_Toe_API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

        public DbSet<Resultado> Resultados { get; set; }
    }
}
