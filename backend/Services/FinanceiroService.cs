using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services
{
    public class FinanceiroService
    {
        private readonly AppDbContext _context;

        // Injeta o contexto do banco de dados PostgreSQL
        public FinanceiroService(AppDbContext context)
        {
            _context = context;
        }

        #region Gerenciamento de Pessoas
        public Pessoa CriarPessoa(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            _context.SaveChanges(); // Salva as alterações no Postgres
            return pessoa;
        }

        public List<Pessoa> ListarPessoas()
        {
            return _context.Pessoas.ToList();
        }

        public bool DeletarPessoa(Guid id)
        {
            var p = _context.Pessoas.FirstOrDefault(pessoa => pessoa.Id == id);
            if (p == null) return false;

            // O próprio PostgreSQL cuidará de apagar as transações em cascata 
            // graças à nossa configuração feita no AppDbContext.cs
            _context.Pessoas.Remove(p);
            _context.SaveChanges();
            return true;
        }
        #endregion

        #region Gerenciamento de Transações
        public List<Transacao> ListarTransacoes()
        {
            return _context.Transacoes.ToList();
        }

        public (Transacao? Transacao, string? Erro) CriarTransacao(Transacao transacao)
        {
            // Validação 1: Verificar se a pessoa existe no banco de dados
            var pessoa = _context.Pessoas.FirstOrDefault(p => p.Id == transacao.PessoaId);
            if (pessoa == null)
            {
                return (null, "A pessoa informada não existe no cadastro.");
            }

            // Validação 2: Verificar se é menor de idade e está tentando cadastrar Receita
            if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacao.Receita)
            {
                return (null, "Menores de 18 anos só podem cadastrar transações do tipo 'Despesa'.");
            }

            _context.Transacoes.Add(transacao);
            _context.SaveChanges();
            return (transacao, null);
        }
        #endregion

        #region Consulta de Totais
        public RelatorioTotaisDto ObterRelatorioTotais()
        {
            var relatorio = new RelatorioTotaisDto();
            var todasAsPessoas = _context.Pessoas.ToList();
            var todasAsTransacoes = _context.Transacoes.ToList();

            foreach (var pessoa in todasAsPessoas)
            {
                var transacoesPessoa = todasAsTransacoes.Where(t => t.PessoaId == pessoa.Id).ToList();

                var receitas = transacoesPessoa.Where(t => t.Tipo == TipoTransacao.Receita).Sum(t => t.Valor);
                var despesas = transacoesPessoa.Where(t => t.Tipo == TipoTransacao.Despesa).Sum(t => t.Valor);

                var resumo = new ResumoPessoaDto
                {
                    PessoaId = pessoa.Id,
                    Nome = pessoa.Nome,
                    TotalReceitas = receitas,
                    TotalDespesas = despesas,
                    Saldo = receitas - despesas
                };

                relatorio.Pessoas.Add(resumo);
            }

            relatorio.TotalGeralReceitas = relatorio.Pessoas.Sum(p => p.TotalReceitas);
            relatorio.TotalGeralDespesas = relatorio.Pessoas.Sum(p => p.TotalDespesas);
            relatorio.SaldoLiquidoGeral = relatorio.TotalGeralReceitas - relatorio.TotalGeralDespesas;

            return relatorio;
        }
        #endregion
    }
}