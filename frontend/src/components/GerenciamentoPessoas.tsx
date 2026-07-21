import { useEffect, useState } from 'react';
import { type Pessoa, pessoaService } from '../services/pessoaService';

export function GerenciamentoPessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState<number | ''>('');
  const [loading, setLoading] = useState(false);

  // Carrega a lista de pessoas ao montar o componente
  const carregarPessoas = async () => {
    try {
      setLoading(true);
      const dados = await pessoaService.listar();
      setPessoas(dados);
    } catch (error) {
      alert('Erro ao carregar lista de pessoas.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPessoas();
  }, []);

  // Cadastrar nova pessoa
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome || idade === '') {
      alert('Preencha nome e idade corretamente!');
      return;
    }

    try {
      await pessoaService.criar({ nome, idade: Number(idade) });
      setNome('');
      setIdade('');
      await carregarPessoas(); // Atualiza a lista
    } catch (error) {
      alert('Erro ao cadastrar pessoa.');
    }
  };

  // Deletar pessoa com aviso sobre as transações
  const handleDeletar = async (id: string, nomePessoa: string) => {
    const confirmacao = window.confirm(
      `Tem certeza que deseja deletar ${nomePessoa}?\nATENÇÃO: Todas as transações associadas a esta pessoa também serão apagadas!`
    );

    if (confirmacao) {
      try {
        await pessoaService.deletar(id);
        await carregarPessoas(); // Atualiza a lista
      } catch (error) {
        alert('Erro ao deletar pessoa.');
      }
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Cadastro de Pessoas</h2>

      {/* Formulário */}
      <form onSubmit={handleSubmit} style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            placeholder="Ex: João Silva"
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem' }}>Idade:</label>
          <input
            type="number"
            value={idade}
            onChange={(e) => setIdade(e.target.value === '' ? '' : Number(e.target.value))}
            style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '100px' }}
            placeholder="Ex: 25"
            min="0"
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            padding: '0.55rem 1.25rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Cadastrar
        </button>
      </form>

      <hr style={{ margin: '2rem 0', borderColor: '#eee' }} />

      {/* Tabela de Listagem */}
      <h3>Pessoas Cadastradas</h3>

      {loading ? (
        <p>Carregando...</p>
      ) : pessoas.length === 0 ? (
        <p>Nenhuma pessoa cadastrada.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-light)', textAlign: 'left' }}>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Nome</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc' }}>Idade</th>
              <th style={{ padding: '0.75rem', borderBottom: '2px solid #ccc', textAlign: 'center' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pessoas.map((pessoa) => (
              <tr key={pessoa.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.75rem' }}>{pessoa.nome}</td>
                <td style={{ padding: '0.75rem' }}>{pessoa.idade} anos</td>
                <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                  <button
                    onClick={() => pessoa.id && handleDeletar(pessoa.id, pessoa.nome)}
                    style={{
                      backgroundColor: '#e74c3c',
                      color: '#fff',
                      border: 'none',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}