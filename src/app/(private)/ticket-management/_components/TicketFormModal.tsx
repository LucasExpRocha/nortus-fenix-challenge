'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { PiXCircleLight } from 'react-icons/pi';
import { toast } from 'sonner';

import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';
import TextField from '@/components/ui/TextField';
import Title from '@/components/ui/Title';
import { ticketSchema, TicketSchema } from '@/validation/ticket';

type Mode = 'create' | 'edit';

type Props = {
  open: boolean;
  mode: Mode;
  initial?: Partial<TicketItem> | null;
  onClose: () => void;
  onSave: (data: TicketFormData) => Promise<void>;
};

export default function TicketFormModal({
  open,
  mode,
  initial,
  onClose,
  onSave,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<TicketSchema>({
    defaultValues: {
      priority: (initial?.priority as TicketPriority) ?? 'Urgente',
      client: initial?.client ?? '',
      email: initial?.email ?? '',
      subject: initial?.subject ?? '',
      status: initial?.status ?? 'Aberto',
      responsible: initial?.responsible ?? '',
    },
    mode: 'onChange',
    resolver: zodResolver(ticketSchema),
  });

  useEffect(() => {
    if (mode === 'edit' && initial) {
      reset({
        priority: (initial.priority as TicketPriority) ?? 'Urgente',
        client: initial.client ?? '',
        email: initial.email ?? '',
        subject: initial.subject ?? '',
        status: initial.status ?? 'Aberto',
        responsible: initial.responsible ?? '',
      });
    }
    if (mode === 'create' && open) {
      reset({
        priority: 'Urgente',
        client: '',
        email: '',
        subject: '',
        status: 'Aberto',
        responsible: '',
      });
    }
  }, [mode, initial, reset, open]);

  const priorities: TicketPriority[] = useMemo(
    () => ['Urgente', 'Média', 'Baixa'],
    []
  );

  const onSubmit = handleSubmit(async (data) => {
    if (mode === 'edit' && initial?.id) {
      await onSave({ ...data, ticketId: initial.ticketId || '' });
    } else {
      await onSave({ ...data, ticketId: 'TK0001' });
    }
  });

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="ticket-modal-title"
      className="fixed inset-0 z-50 flex-center"
    >
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative w-full max-w-xl mx-4 rounded-4xl bg-[#0B1125] shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between px-8 pt-8">
          <Title
            id="ticket-modal-title"
            className="font-normal text-2xl leading-8 text-center"
          >
            {mode === 'create' ? 'Novo Ticket' : 'Editar Ticket'}
          </Title>
          <button
            aria-label="Fechar"
            onClick={onClose}
            className="cursor-pointer"
            type="button"
          >
            <PiXCircleLight className="w-12 h-12" />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4"
          aria-label="Formulário de ticket"
        >
          <div className="px-8 pt-6 pb-2 space-y-4 lea">
            {mode === 'edit' && !initial && (
              <div
                className="w-full h-28 flex-center text-slate-300"
                aria-live="polite"
              >
                Carregando ticket...
              </div>
            )}
            <TextField
              id="client"
              label="Nome do cliente"
              register={register('client')}
              placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
              autoFocus
              autoComplete="off"
              required
              error={errors.client?.message}
              outside
              containerClassName="rounded-3xl"
              inputClassName="h-16 py-1 px-6 rounded-4xl font-normal not-italic text-sm leading-5 tracking-[0.25px]"
            />
            <TextField
              id="email"
              label="Email do cliente"
              register={register('email', { required: 'Campo obrigatório' })}
              placeholder="E-mail de contato para atualizações e resposta"
              autoComplete="off"
              required
              error={errors.email?.message}
              outside
              containerClassName="rounded-3xl"
              inputClassName="h-16 py-1 px-6 rounded-4xl font-normal not-italic text-sm leading-5 tracking-[0.25px]"
            />

            <div className="w-full" aria-label="Prioridade">
              <label
                htmlFor="priority"
                className={
                  'mb-1 block font-medium text-base leading-6 tracking-[0.15px] ml-5.5'
                }
              >
                Prioridade
              </label>
              <Select
                id="priority"
                value={watch('priority')}
                onChange={(val) =>
                  setValue('priority', val as TicketPriority, {
                    shouldValidate: true,
                  })
                }
                options={priorities}
                containerClassName="rounded-3xl h-16 pl-6 pr-6 border border-slate-700 bg-[#0E1626] focus-within:border-blue-500"
                selectClassName="font-normal not-italic text-sm leading-5 tracking-[0.25px]"
                placeholder="Selecione o nível de urgência do atendimento"
              />
              {errors.priority?.message && (
                <span
                  id="priority-error"
                  className="mt-1 block text-sm text-red-500"
                >
                  {errors.priority.message}
                </span>
              )}
            </div>

            <TextField
              id="responsible"
              label="Responsavel"
              register={register('responsible', {
                required: 'Campo obrigatório',
              })}
              placeholder="Quem será o responsável por esse ticket"
              autoComplete="off"
              required
              error={errors.responsible?.message}
              outside
              containerClassName="rounded-3xl"
              inputClassName="h-16 py-1 px-6 rounded-4xl font-normal not-italic text-sm leading-5 tracking-[0.25px]"
            />

            <div className="w-full flex flex-col gap-4">
              <label
                htmlFor="subject"
                className={
                  'mb-1 block font-medium text-base leading-6 tracking-[0.15px] ml-5.5'
                }
              >
                Assunto
              </label>
              <textarea
                id="subject"
                {...register('subject', { required: 'Campo obrigatório' })}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                className="h-28 py-2 px-6 rounded-4xl border border-slate-700 bg-[#0E1626] focus-with outline-none"
              />
              {errors.subject?.message && (
                <span
                  id="subject-error"
                  className="mt-1 block text-sm text-red-500"
                >
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex-center gap-3 px-8 pb-8">
            <Button
              fullWidth={false}
              className="bg-[rgba(255,255,255,0.1)]"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button fullWidth={false} disabled={!isValid} type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
