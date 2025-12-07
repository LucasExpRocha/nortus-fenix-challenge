'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { ticketsService } from '@/app/services/tickets.service';

import TicketFormModal from './_components/TicketFormModal';
import TicketMetricsHeader from './_components/TicketMetricsHeader';
import TicketsTable from './_components/TicketsTable';

export default function TicketManagement() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit') || null;

  const {
    data: ticketsList,
    isLoading: isLoadingTicketsList,
    refetch,
  } = useQuery({
    queryKey: ['ticketsList'],
    queryFn: ticketsService.getAllTickets,
    refetchInterval: 20 * 1000,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  const { data: editingTicket } = useQuery({
    queryKey: ['ticket', editId],
    queryFn: () => ticketsService.getTicket(editId!),
    enabled: !!editId,
    retry: 1,
  });

  const createMutation = useMutation({
    mutationFn: (data: TicketFormData) => ticketsService.createTicket(data),
    onSuccess: () => {
      toast.success('Ticket criado com sucesso!', {
        description: 'O ticket foi criado e já está na sua lista.',
      });
      refetch();
      setOpen(false);
      setMode('create');
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string; data: TicketFormData }) =>
      ticketsService.updateTicket(vars.id, vars.data),
    onSuccess: () => {
      toast.success('Ticket editado com sucesso!', {
        description: 'O ticket foi editado e já está na sua lista.',
      });
      refetch();
      setOpen(false);
      setMode('create');
    },
  });

  const handleSave = async (data: TicketFormData) => {
    if (editId) {
      await updateMutation.mutateAsync({ id: editId, data });
    } else {
      const toastId = toast.loading('Criando ticket... ');
      await createMutation.mutateAsync(data);
      toast.dismiss(toastId);
    }
  };

  useEffect(() => {
    const handler = () => {
      setMode('create');
      setOpen(true);
    };
    window.addEventListener('open-ticket-modal', handler as EventListener);
    return () => {
      window.removeEventListener('open-ticket-modal', handler as EventListener);
    };
  }, []);

  return (
    <div>
      <TicketMetricsHeader
        ticketsList={ticketsList}
        isLoading={isLoadingTicketsList}
      />
      <TicketsTable
        ticketsList={ticketsList}
        isLoading={isLoadingTicketsList}
      />
      <TicketFormModal
        open={open || !!editId}
        mode={!!editId ? 'edit' : mode}
        initial={!!editId ? (editingTicket ?? null) : null}
        onClose={() => {
          const params = new URLSearchParams(
            Array.from(searchParams.entries())
          );
          params.delete('edit');
          const qs = params.toString();
          const url = qs ? `${pathname}?${qs}` : pathname;
          setOpen(false);
          setMode('create');
          router.replace(url);
        }}
        onSave={handleSave}
      />
    </div>
  );
}
