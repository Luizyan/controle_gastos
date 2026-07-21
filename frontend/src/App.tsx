import { useState } from 'react';
import { GerenciamentoPessoas } from './components/GerenciamentoPessoas';
import { GerenciamentoTransacoes } from './components/GerenciamentoTransacoes';
import { ConsultaTotais } from './components/ConsultaTotais';

type Tab = 'pessoas' | 'transacoes' | 'totais';

function App() {
  const [abaAtiva, setAbaAtiva] = useState<Tab>('pessoas');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg-white)' }}>
      {/* Cabeçalho */}
      <header
        style={{
          backgroundColor: 'var(--color-primary)',
          color: '#fff',
          padding: '1.5rem 2rem',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '0.25rem' }}>
            Controle de Gastos Residenciais
          </h1>
        </div>
      </header>

      {/* Navegação por Abas */}
      <nav
        style={{
          backgroundColor: 'var(--color-bg-light)',
          borderBottom: '1px solid #ddd',
        }}
      >
        <div
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'flex',
            gap: '0.5rem',
            padding: '0 2rem',
          }}
        >
          <button
            onClick={() => setAbaAtiva('pessoas')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderBottom: abaAtiva === 'pessoas' ? '3px solid var(--color-secondary)' : '3px solid transparent',
              backgroundColor: 'transparent',
              fontWeight: abaAtiva === 'pessoas' ? 'bold' : 'normal',
              color: abaAtiva === 'pessoas' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            Pessoas
          </button>

          <button
            onClick={() => setAbaAtiva('transacoes')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderBottom: abaAtiva === 'transacoes' ? '3px solid var(--color-secondary)' : '3px solid transparent',
              backgroundColor: 'transparent',
              fontWeight: abaAtiva === 'transacoes' ? 'bold' : 'normal',
              color: abaAtiva === 'transacoes' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            Transações
          </button>

          <button
            onClick={() => setAbaAtiva('totais')}
            style={{
              padding: '0.75rem 1.25rem',
              border: 'none',
              borderBottom: abaAtiva === 'totais' ? '3px solid var(--color-secondary)' : '3px solid transparent',
              backgroundColor: 'transparent',
              fontWeight: abaAtiva === 'totais' ? 'bold' : 'normal',
              color: abaAtiva === 'totais' ? 'var(--color-primary)' : 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            Totais / Relatórios
          </button>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {abaAtiva === 'pessoas' && <GerenciamentoPessoas />}
        {abaAtiva === 'transacoes' && <GerenciamentoTransacoes />}
        {abaAtiva === 'totais' && <ConsultaTotais />}
      </main>
    </div>
  );
}

export default App;