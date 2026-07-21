import { api } from './api';

export interface Pessoa {
  id?: string; // Opcional no envio (backend gera o Guid), presente no retorno
  nome: string;
  idade: number;
}

export const pessoaService = {
  // GET: /api/pessoas
  listar: async (): Promise<Pessoa[]> => {
    const response = await api.get<Pessoa[]>('/pessoas');
    return response.data;
  },

  // POST: /api/pessoas
  criar: async (pessoa: Omit<Pessoa, 'id'>): Promise<Pessoa> => {
    const response = await api.post<Pessoa>('/pessoas', pessoa);
    return response.data;
  },

  // DELETE: /api/pessoas/{id}
  deletar: async (id: string): Promise<void> => {
    await api.delete(`/pessoas/${id}`);
  },
};