using System.Text.Json.Serialization;

namespace backend.Models
{
    // Enum para garantir que o Tipo seja apenas despesa ou receita
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TipoTransacao
    {
        Despesa,
        Receita
    }

    public class Transacao
    {
        public Guid Id { get; set; } = Guid.NewGuid(); // Identificador único gerado automaticamente
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public Guid PessoaId { get; set; } // Identificador da pessoa (chave estrangeira)
    }
}