import { api } from './api';

export interface Transacao {
  id?: string | number;
  descricao: string;
  valor: number;
  tipo: 'Receita' | 'Despesa' | number; // Aceita tanto a string quanto o enum numérico do C#
  pessoaId: string | number;
  nomePessoa?: string;
}

export const transacaoService = {
  // GET: /api/transacoes
  listar: async (): Promise<Transacao[]> => {
    const response = await api.get<Transacao[]>('/transacoes');
    return response.data;
  },

  // POST: /api/transacoes
  criar: async (transacao: Omit<Transacao, 'id'>): Promise<Transacao> => {
    const response = await api.post<Transacao>('/transacoes', transacao);
    return response.data;
  },
};