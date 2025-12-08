'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Suspense, useRef } from 'react';

import Card from '@/components/ui/Cards';
import Skeleton from '@/components/ui/Skeleton';
import Title from '@/components/ui/Title';
import { currency } from '@/lib/utils/formatCurrency';

function SidebarPlansSkeleton() {
  return (
    <div className="space-y-6">
      <Card className="py-10 px-8" aria-live="polite">
        <Skeleton className="h-6 w-40" />
        <div className="flex flex-wrap gap-2 mt-4">
          <Skeleton className="h-7 w-24 rounded-4xl" />
          <Skeleton className="h-7 w-28 rounded-4xl" />
          <Skeleton className="h-7 w-32 rounded-4xl" />
        </div>
      </Card>
      <Card className="flex-center flex-col 2xl:mt-8 gap-8 p-10">
        <Skeleton className="h-6 w-32 self-start" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
        <Skeleton className="h-16 w-full rounded-2xl" />
      </Card>
    </div>
  );
}

function SidebarPlansInner({
  includedBenefits,
  plansIndicators,
}: {
  includedBenefits?: string[];
  plansIndicators?: SimulatorPlanIndicator[];
}) {
  const indicators = useRef<HTMLDivElement>(null);
  const benefits = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (indicators.current) {
      gsap.from(indicators.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.2,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
    if (benefits.current) {
      gsap.from(benefits.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.2,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <div id="sidebar-plans-root" className="space-y-6">
      <Card className="py-10 px-8">
        <Title variant="h2">Benefícios Inclusos</Title>
        <div className="flex flex-wrap gap-2" ref={benefits}>
          {includedBenefits?.map((b) => (
            <span
              key={b}
              className="inline-flex items-center justify-center text-xs gap-2 rounded-4xl border-[1px] px-3 py-2 bg-[rgba(255,255,255,0.08)] border-[#FFFFFF1A] before:content-[''] before:inline-block before:w-2 before:h-2 before:bg-[#006FFF] before:shadow-[0_0_4px_#006FFF] before:rounded-full before:mr-2"
            >
              {b}
            </span>
          ))}
        </div>
      </Card>

      <Card className="flex-center flex-col 2xl:mt-8 gap-8 p-10">
        <Title aria-label="Indicadores" className="content-start w-full">
          Indicadores
        </Title>
        <div
          className="flex-center flex-col 2xl:mt-8 gap-8 w-full"
          ref={indicators}
        >
          {plansIndicators?.map((p) => (
            <div
              key={`indicador-${p.name}`}
              className="flex items-center justify-between rounded-2xl bg-[rgba(255,255,255,0.05)] w-full p-6"
            >
              <div>
                <Title className="mb-2 leading-8">{p.name}</Title>
                <div className="flex">
                  <Title
                    variant="subtitle"
                    className="text-xs text-slate-400 mr-6"
                  >
                    Conversão:{' '}
                    <span className="text-[#00DC04] text-shadow-[0px_0px_2px_0px_#00DC0480]">
                      {p.conversion}%
                    </span>
                  </Title>
                  <div className="text-xs text-slate-400">
                    ROI:{' '}
                    <span className="text-[#00DC04] text-shadow-[0px_0px_2px_0px_#00DC0480]">
                      {p.roi}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <Title>{currency.format(p.value)}</Title>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function SidebarPlans(props: {
  isLoading?: boolean;
  includedBenefits?: string[];
  plansIndicators?: SimulatorPlanIndicator[];
}) {
  return (
    <Suspense fallback={<SidebarPlansSkeleton />}>
      <SidebarPlansInner {...props} />
    </Suspense>
  );
}
