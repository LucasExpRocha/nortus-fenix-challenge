'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { PiPencilSimpleLine } from 'react-icons/pi';

import Card from '@/components/ui/Cards';
import Select from '@/components/ui/Select';
import TextField from '@/components/ui/TextField';
import Title from '@/components/ui/Title';

type Props = {
  ticketsList?: TicketsAllResponse;
  isLoading: boolean;
};

const ITEMS_PER_PAGE = 5;

export default function TicketsTable({ ticketsList, isLoading }: Props) {
  const tickets = (ticketsList?.data?.filter(Boolean) || []) as TicketItem[];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [status, setStatus] = useState(
    searchParams.get('status') || 'Todos os status'
  );
  const [priority, setPriority] = useState(
    searchParams.get('priority') || 'Todas as prioridades'
  );
  const [responsible, setResponsible] = useState(
    searchParams.get('responsible') || 'Todos os responsáveis'
  );
  const [page, setPage] = useState(1);

  const statusOptions = [
    'Todos os status',
    ...new Set(tickets.map((t) => t.status)),
  ];
  const priorityOptions = [
    'Todas as prioridades',
    ...new Set(tickets.map((t) => t.priority)),
  ];
  const responsibleOptions = [
    'Todos os responsáveis',
    ...new Set(tickets.map((t) => t.responsible)),
  ];

  const filteredTickets = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return tickets.filter((ticket) => {
      if (status !== 'Todos os status' && ticket.status !== status) {
        return false;
      }

      if (priority !== 'Todas as prioridades' && ticket.priority !== priority) {
        return false;
      }

      if (
        responsible !== 'Todos os responsáveis' &&
        ticket.responsible !== responsible
      ) {
        return false;
      }

      if (searchTerm) {
        const searchableText = [
          ticket.ticketId,
          ticket.id,
          ticket.client,
          ticket.subject,
        ]
          .join(' ')
          .toLowerCase();

        if (!searchableText.includes(searchTerm)) {
          return false;
        }
      }

      return true;
    });
  }, [tickets, search, status, priority, responsible]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTickets.length / ITEMS_PER_PAGE)
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleTickets = filteredTickets.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const goToPreviousPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  const goToFirstPage = () => {
    if (currentPage > 1) setPage(1);
  };

  const goToLastPage = () => {
    if (currentPage < totalPages) setPage(totalPages);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) params.set('search', search.trim());
      if (status !== 'Todos os status') params.set('status', status);
      if (priority !== 'Todas as prioridades') params.set('priority', priority);
      if (responsible !== 'Todos os responsáveis')
        params.set('responsible', responsible);

      const queryString = params.toString();
      const url = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(url);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, status, priority, responsible, pathname, router]);

  const formatDateTime = (isoString: string) => {
    return new Date(isoString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const statusColors: Record<TicketStatus, string> = {
    Aberto: 'bg-blue-600/30 text-blue-300',
    'Em andamento': 'bg-yellow-600/30 text-yellow-300',
    Fechado: 'bg-green-600/30 text-green-300',
  };

  const priorityColors: Record<TicketPriority, string> = {
    Urgente: 'bg-red-600/30 text-red-300',
    Média: 'bg-orange-600/30 text-orange-300',
    Baixa: 'bg-slate-600/30 text-slate-300',
  };

  return (
    <section aria-label="Tabela de tickets" className="mt-6">
      <Card className="gap-4">
        <div className="flex items-center justify-between mb-4">
          <Title variant="h2" as="h2">
            Tickets
          </Title>
        </div>

        <div className="flex items-center gap-2">
          <TextField
            id="buscar"
            label="Buscar por ID, cliente ou assunto..."
            value={search}
            onChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            required={false}
            variant="filter"
            startIcon={<IoIosSearch />}
            className="w-full flex-2"
          />

          <Select
            value={status}
            onChange={(val) => {
              setStatus(val);
              setPage(1);
            }}
            options={statusOptions}
            ariaLabel="Filtro de status"
            className="w-full md:min-w-40 flex-1"
          />

          <Select
            value={priority}
            onChange={(val) => {
              setPriority(val);
              setPage(1);
            }}
            options={priorityOptions}
            ariaLabel="Filtro de prioridade"
            className="w-full md:min-w-52 flex-1"
          />

          <Select
            value={responsible}
            onChange={(val) => {
              setResponsible(val);
              setPage(1);
            }}
            options={responsibleOptions}
            ariaLabel="Filtro de responsável"
            className="w-full col-span-12 sm:col-span-6 md:col-span-2 md:min-w-52 flex-1"
          />
        </div>

        <div className="overflow-x-auto bg-[rgba(255,255,255,.05)] p-6 rounded-2xl">
          <table className="table-auto min-w-full text-sm">
            <thead>
              <tr className="text-left text-slate-300">
                <th className="py-3 px-4 ">ID</th>
                <th className="py-3 px-4">Prioridade</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Assunto</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Criado em</th>
                <th className="py-3 px-4">Responsável</th>
                <th className="py-3 px-4">Ações</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-6 px-4 text-center">
                    Carregando...
                  </td>
                </tr>
              ) : visibleTickets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-6 px-4 text-center">
                    Nenhum resultado encontrado
                  </td>
                </tr>
              ) : (
                visibleTickets.map((ticket) => (
                  <tr key={ticket.id} className="border-t border-white/10">
                    <td className="py-3 px-4 h-20">
                      <span className="font-semibold leading-4">
                        {ticket.ticketId}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-2xl px-3 py-1 text-xs ${priorityColors[ticket.priority]}`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-[100px]">
                      <div className="relative group">
                        <span className="font-semibold leading-4 truncate block">
                          {ticket.client}
                        </span>
                        <span className="font-normal leading-4 truncate block">
                          {ticket.email}
                        </span>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block lg:hidden px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {ticket.client} – {ticket.email}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 max-w-[100px]">
                      <div className="relative group">
                        <span
                          className="font-semibold leading-4 truncate block"
                          title={ticket.subject}
                        >
                          {ticket.subject}
                        </span>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {ticket.subject}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center rounded-2xl px-3 py-1 text-xs ${statusColors[ticket.status]}`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 max-w-[100px]">
                      <div className="relative group">
                        <span
                          className="font-semibold leading-4 truncate block"
                          title={formatDateTime(ticket.createdAt)}
                        >
                          {formatDateTime(ticket.createdAt)}
                        </span>
                        <div className="absolute left-0 top-full mt-1 hidden group-hover:block px-2 py-1 text-xs bg-slate-800 text-white rounded shadow-lg z-10 whitespace-nowrap">
                          {formatDateTime(ticket.createdAt)}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{ticket.responsible}</td>
                    <td className="py-3 px-4">
                      <div className="relative group">
                        <div className="hidden xl:flex items-center gap-6">
                          <button
                            className="text-slate-300 hover:text-slate-100 font-normal text-xs leading-4 text-center flex items-center gap-2"
                            onClick={() => {
                              const params = new URLSearchParams(
                                Array.from(searchParams.entries())
                              );
                              params.set('edit', ticket.id);
                              const url = `${pathname}?${params.toString()}`;
                              router.push(url);
                            }}
                          >
                            Editar{' '}
                            <PiPencilSimpleLine color="#1876D2" size={16} />
                          </button>
                          <button
                            onClick={() => alert('Em desenvolvimento.')}
                            className="text-slate-300 hover:text-slate-100 font-normal text-xs leading-4 text-center flex items-center gap-2"
                          >
                            Ver{' '}
                            <MdOutlineKeyboardArrowRight
                              color="#1876D2"
                              size={16}
                            />
                          </button>
                        </div>

                        <div className="xl:hidden">
                          <button
                            aria-label="Abrir menu de ações"
                            className="text-slate-300 hover:text-slate-100 flex items-center gap-1 text-xs leading-4"
                            onClick={(e) => {
                              const menu = (e.currentTarget as HTMLElement)
                                .nextElementSibling as HTMLElement;
                              menu.classList.toggle('hidden');
                            }}
                          >
                            Ações
                            <MdOutlineKeyboardArrowRight
                              color="#1876D2"
                              size={16}
                              className="transform group-hover:rotate-90 transition-transform"
                            />
                          </button>
                          <div className="absolute right-0 top-full mt-1 hidden flex-col bg-slate-800 rounded shadow-lg z-20 min-w-[120px]">
                            <button
                              className="px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-700 text-xs flex items-center gap-2 text-left"
                              onClick={() => {
                                const params = new URLSearchParams(
                                  Array.from(searchParams.entries())
                                );
                                params.set('edit', ticket.id);
                                const url = `${pathname}?${params.toString()}`;
                                router.push(url);
                                const menu = document.querySelector(
                                  `[data-ticket-id="${ticket.id}"] .xl:hidden > div`
                                ) as HTMLElement;
                                if (menu) menu.classList.add('hidden');
                              }}
                            >
                              <PiPencilSimpleLine color="#1876D2" size={14} />
                              Editar
                            </button>
                            <Link
                              href={`/ticket-management/${ticket.id}`}
                              className="px-3 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-700 text-xs flex items-center gap-2"
                              onClick={() => {
                                const menu = document.querySelector(
                                  `[data-ticket-id="${ticket.id}"] .xl:hidden > div`
                                ) as HTMLElement;
                                if (menu) menu.classList.add('hidden');
                              }}
                            >
                              <MdOutlineKeyboardArrowRight
                                color="#1876D2"
                                size={14}
                              />
                              Ver
                            </Link>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end w-full px-6">
          <div className="flex items-center gap-6">
            <button
              aria-label="Primeira página"
              disabled={currentPage <= 1}
              onClick={goToFirstPage}
              className={
                currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              <Image
                src="/svgs/arrowleftfinish.svg"
                alt="Primeira página"
                width={36}
                height={36}
              />
            </button>
            <button
              aria-label="Página anterior"
              disabled={currentPage <= 1}
              onClick={goToPreviousPage}
              className={
                currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              <Image
                src="/svgs/arrowleft.svg"
                alt="Página anterior"
                width={36}
                height={36}
              />
            </button>
          </div>

          <span className="text-base leading-6 font-medium text-slate-300">
            {currentPage} de {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              aria-label="Próxima página"
              disabled={currentPage >= totalPages}
              onClick={goToNextPage}
              className={
                currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              <Image
                src="/svgs/arrowright.svg"
                alt="Próxima página"
                width={36}
                height={36}
              />
            </button>
            <button
              aria-label="Última página"
              disabled={currentPage >= totalPages}
              onClick={goToLastPage}
              className={
                currentPage >= totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }
            >
              <Image
                src="/svgs/arrowrightfinish.svg"
                alt="Última página"
                width={36}
                height={36}
              />
            </button>
          </div>
        </div>
      </Card>
    </section>
  );
}
