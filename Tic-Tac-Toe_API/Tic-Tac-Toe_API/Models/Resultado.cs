namespace Tic_Tac_Toe_API.Models
{
    public class Resultado
    {
        // Chave primária
        public int Id { get; set; }

        // "X", "O" ou "E" para empate
        public string Vencedor { get; set; } = string.Empty;

        // Quando o jogo terminou
        public DateTime DataHora { get; set; }     
    }
}
