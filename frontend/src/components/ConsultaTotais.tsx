import { useEffect, useState } from 'react';
import { relatorioService, type RelatorioTotais } from '../services/relatorioService';

export function ConsultaTotais() {
  const [relatorio, setRelatorio] = useState<RelatorioTotais | null>(null);
  const [loading, setLoading] = useState(false);

  const carregarTotais = async () => {
    try {
      setLoading(true);
      const dados = await relatorioService.obterTotais();
      setRelatorio(dados);
    } catch (error) {
      alert('Erro ao carregar o relatório de totais.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarTotais();
  }, []);

  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Consulta de Totais</h2>
        <button
          onClick={carregarTotais}
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Atualizar
        </button>
      </div>

      {loading ? (
        <p>Carregando relatórios...</p>
      ) : !relatorio ? (
        <p>Nenhum dado encontrado.</p>
      ) : (
        <>
          {/* Tabela de Totais por Pessoa */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
                <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Pessoa</th>
                <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Total Receitas</th>
                <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Total Despesas</th>
                <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Saldo</th>
              </tr>
            </thead>
            <tbody>
              {relatorio.pessoas?.map((item) => (
                <tr key={item.pessoaId} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{(item as any).nome || item.nomePessoa || 'Sem nome'}</td>
                  <td style={{ padding: '0.75rem', color: '#27ae60' }}>{formatarMoeda(item.totalReceitas)}</td>
                  <td style={{ padding: '0.75rem', color: '#c0392b' }}>{formatarMoeda(item.totalDespesas)}</td>
                  <td
                    style={{
                      padding: '0.75rem',
                      fontWeight: 'bold',
                      color: item.saldo >= 0 ? '#27ae60' : '#c0392b',
                    }}
                  >
                    {formatarMoeda(item.saldo)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Card de Resumo Geral */}
          <div
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'var(--color-bg-light)',
              borderRadius: '8px',
              borderLeft: '5px solid var(--color-primary)',
            }}
          >
            <h3 style={{ marginBottom: '1rem' }}>Total Geral do Sistema</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
              <div>
                <small style={{ color: 'var(--color-text-muted)' }}>Receitas Totais</small>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#27ae60' }}>
                  {formatarMoeda(relatorio.totalGeralReceitas)}
                </p>
              </div>
              <div>
                <small style={{ color: 'var(--color-text-muted)' }}>Despesas Totais</small>
                <p style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#c0392b' }}>
                  {formatarMoeda(relatorio.totalGeralDespesas)}
                </p>
              </div>
              <div>
                <small style={{ color: 'var(--color-text-muted)' }}>Saldo Líquido Geral</small>
                <p
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    color: relatorio.saldoLiquidoGeral >= 0 ? '#27ae60' : '#c0392b',
                  }}
                >
                  {formatarMoeda(relatorio.saldoLiquidoGeral)}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}