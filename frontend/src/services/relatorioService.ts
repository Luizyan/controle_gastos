import { api } from './api';

export interface TotaisPessoa {
  pessoaId: string;
  nomePessoa?: string; // Ajuste o nome da propriedade se no C# vier diferente (ex: nome)
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface RelatorioTotais {
  pessoas: TotaisPessoa[];
  totalGeralReceitas: number;
  totalGeralDespesas: number;
  saldoLiquidoGeral: number;
}

export const relatorioService = {
  // GET: /api/relatorios/totais
  obterTotais: async (): Promise<RelatorioTotais> => {
    const response = await api.get<RelatorioTotais>('/relatorios/totais');
    return response.data;
  },
};