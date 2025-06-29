namespace Tic_Tac_Toe_API.DTOs
{
    public class ResultadoDTO
    {
        public int Id { get; set; }
        public string Vencedor { get; set; } = string.Empty;
        public DateTime DataHora { get; set; }
    }
}
