import { useEffect, useState } from 'react';
import { pessoaService, type Pessoa } from '../services/pessoaService';
import { transacaoService, type Transacao } from '../services/transacaoService';

export function GerenciamentoTransacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [loading, setLoading] = useState(false);

  // Campos do Formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState<number | ''>('');
  const [tipo, setTipo] = useState<'Receita' | 'Despesa'>('Receita');
  const [pessoaId, setPessoaId] = useState<string>('');

  const carregarDados = async () => {
    try {
      setLoading(true);
      const [listaTransacoes, listaPessoas] = await Promise.all([
        transacaoService.listar(),
        pessoaService.listar(),
      ]);
      setTransacoes(listaTransacoes);
      setPessoas(listaPessoas);
    } catch (error) {
      alert('Erro ao carregar dados de transações.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!descricao || valor === '' || !pessoaId) {
      alert('Preencha todos os campos!');
      return;
    }

    // Validação da regra de negócio de menor de idade no Frontend
    const pessoaSelecionada = pessoas.find((p) => String(p.id) === String(pessoaId));
    if (pessoaSelecionada && pessoaSelecionada.idade < 18 && tipo === 'Receita') {
      alert('Menores de 18 anos só podem registrar despesas!');
      return;
    }

    try {
      await transacaoService.criar({
        descricao,
        valor: Number(valor),
        tipo,
        pessoaId,
      });

      setDescricao('');
      setValor('');
      setPessoaId('');
      alert('Transação criada com sucesso!');
      carregarDados();
    } catch (error: any) {
      // Captura a mensagem de erro retornada pelo C# (ex: BadRequest de menor de idade)
      const mensagemErro = error.response?.data || 'Erro ao cadastrar transação.';
      alert(typeof mensagemErro === 'string' ? mensagemErro : 'Erro ao cadastrar transação.');
    }
  };

  const formatarMoeda = (val: number) => {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Cadastro de Transações</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Descrição:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Salário, Mercado, Luz"
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Valor (R$):</label>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="0,00"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '0.25rem' }}>Tipo:</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as 'Receita' | 'Despesa')}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            >
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Pessoa Responsável:</label>
          <select
            value={pessoaId}
            onChange={(e) => setPessoaId(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecione uma pessoa...</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nome} ({p.idade} anos)
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            padding: '0.75rem',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginTop: '0.5rem',
          }}
        >
          Cadastrar Transação
        </button>
      </form>

      <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

      {/* Tabela de Listagem */}
      <h3>Histórico de Transações</h3>

      {loading ? (
        <p>Carregando...</p>
      ) : transacoes.length === 0 ? (
        <p style={{ color: 'var(--color-text-muted)' }}>Nenhuma transação cadastrada.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Descrição</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Pessoa</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Tipo</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((item) => {
              const eReceita = String(item.tipo).toLowerCase() === 'receita' || item.tipo === 0;
              return (
                <tr key={item.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem' }}>{item.descricao}</td>
                  <td style={{ padding: '0.75rem' }}>
                    {(item as any).pessoa?.nome || item.nomePessoa || 'Pessoa'}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: eReceita ? '#27ae60' : '#c0392b' }}>
                    {eReceita ? 'Receita' : 'Despesa'}
                  </td>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold', color: eReceita ? '#27ae60' : '#c0392b' }}>
                    {eReceita ? '+' : '-'} {formatarMoeda(item.valor)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}