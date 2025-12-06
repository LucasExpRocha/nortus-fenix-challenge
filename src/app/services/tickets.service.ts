import { toast } from 'sonner';

export const ticketsService = {
  getAllTickets: async (): Promise<TicketsAllResponse> => {
    try {
      const res = await fetch('/api/tickets');
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Falha ao buscar tickets');
      }
      return res.json();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erro ao buscar tickets';

      toast.error(message);
      throw error;
    }
  },
};

export * from './map.service';
