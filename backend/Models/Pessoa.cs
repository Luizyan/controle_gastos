namespace backend.Models
{
    public class Pessoa
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // Identificador único gerado automaticamente
        public string Nome { get; set; } = string.Empty;
        public int Idade { get; set; }
    }
}