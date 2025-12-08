'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Suspense, useRef } from 'react';

import Card from '@/components/ui/Cards';
import Skeleton from '@/components/ui/Skeleton';
import Title from '@/components/ui/Title';

function TicketMetricsSkeleton() {
  return (
    <header
      className="grid grid-cols-4 gap-4 2xl:gap-6 max-md:grid-cols-2"
      aria-label="Métricas de tickets"
    >
      {[0, 1, 2, 3].map((i) => (
        <Card key={`metric-skeleton-${i}`} className="p-6">
          <div className="flex flex-col justify-between gap-8">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-12" />
                <Skeleton className="h-7 w-6" />
              </div>
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
          </div>
        </Card>
      ))}
    </header>
  );
}

function TicketMetricsHeaderInner({
  ticketsList,
}: {
  ticketsList?: TicketsAllResponse;
}) {
  const metricsRef = useRef<HTMLDivElement>(null);

  const tickets = (ticketsList?.data?.filter(Boolean) || []) as TicketItem[];

  const open = tickets.filter((t) => t && t.status === 'Aberto').length;
  const progress = tickets.filter(
    (t) => t && t.status === 'Em andamento'
  ).length;

  const today = new Date();
  const solvedToday = tickets.filter((t) => {
    if (t && t.status !== 'Fechado') return false;
    const d = new Date(t!.updatedAt);
    return (
      d.getFullYear() === today.getFullYear() &&
      d.getMonth() === today.getMonth() &&
      d.getDate() === today.getDate()
    );
  }).length;

  const closed = tickets.filter((t) => t && t.status === 'Fechado');
  const timeAvg = closed.length
    ? Number(
        (
          closed
            .map(
              (t) =>
                (new Date(t.updatedAt).getTime() -
                  new Date(t.createdAt).getTime()) /
                36e5
            )
            .reduce((a, b) => a + b, 0) / closed.length
        ).toFixed(1)
      )
    : 0;

  const metrics = [
    {
      title: 'Ticket aberto',
      icon: '/svgs/ticketAberto.svg',
      value: open,
    },
    {
      title: 'Em andamento',
      icon: '/svgs/emAndamento.svg',
      value: progress,
    },
    {
      title: 'Resolvidos hoje',
      icon: '/svgs/resolvidosHoje.svg',
      value: solvedToday,
    },
    {
      title: 'Tempo médio',
      icon: '/svgs/tempoMedio.svg',
      value: timeAvg,
      unit: 'h',
    },
  ];

  useGSAP(() => {
    if (metricsRef.current) {
      gsap.from(metricsRef.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.1,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <header aria-label="Métricas de tickets">
      <div
        className="grid grid-cols-4 gap-4 2xl:gap-6 max-md:grid-cols-2"
        ref={metricsRef}
      >
        {metrics.map((metric) => (
          <Card
            key={metric.title}
            aria-label={`${metric.title} ${metric.value} ${metric.unit}`}
          >
            <div className="flex flex-col justify-between gap-8">
              <Title variant="subtitle">{metric.title}</Title>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Title>{metric.value}</Title>
                  <Title>{metric.unit}</Title>
                </div>
                <Image
                  src={metric.icon}
                  alt={metric.title}
                  width={32}
                  height={32}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </header>
  );
}

export default function TicketMetricsHeader(props: {
  ticketsList?: TicketsAllResponse;
  isLoading: boolean;
}) {
  return (
    <Suspense fallback={<TicketMetricsSkeleton />}>
      <TicketMetricsHeaderInner ticketsList={props.ticketsList} />
    </Suspense>
  );
}
