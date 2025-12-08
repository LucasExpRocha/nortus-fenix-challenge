'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger, SplitText } from 'gsap/all';
import { useRef, useState } from 'react';
import React, { Suspense } from 'react';

import Card from '@/components/ui/Cards';
import Checkbox from '@/components/ui/Checkbox';
import Skeleton from '@/components/ui/Skeleton';
import Title from '@/components/ui/Title';
import { currency } from '@/lib/utils/formatCurrency';

gsap.registerPlugin(ScrollTrigger, SplitText);

function PlanSkeleton() {
  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-6 w-44" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    </Card>
  );
}

function PersonalizedPlansInner({
  plansIndicators,
}: {
  plansIndicators?: SimulatorPlanIndicator[];
}) {
  const [selectedPlan, setSelectedPlan] = useState<string>('Intermediário');
  const [vehicleValue, setVehicleValue] = useState<number>(50000);
  const [clientAge, setClientAge] = useState<number>(28);
  const [benefits, setBenefits] = useState<Record<string, boolean>>({
    rouboFurto: true,
    colisao: true,
    incendio: true,
    fenomenos: false,
  });

  const addTotal =
    (benefits.rouboFurto ? 25 : 0) +
    (benefits.colisao ? 35 : 0) +
    (benefits.incendio ? 20 : 0) +
    (benefits.fenomenos ? 30 : 0);

  const title = useRef<HTMLHeadingElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (title.current) {
      gsap.from(title.current, {
        opacity: 0,
        y: 16,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
    if (cards.current) {
      gsap.from(cards.current.children, {
        opacity: 0,
        y: 24,
        stagger: 0.2,
        duration: 0.45,
        ease: 'power2.out',
      });
    }
  }, []);

  return (
    <div id="personalized-plans-root">
      <Card>
        <div className="flex items-center justify-between" ref={title}>
          <Title variant="h2" id="personalized-plans-title">
            Planos personalizados
          </Title>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" ref={cards}>
          {plansIndicators &&
            plansIndicators.length > 0 &&
            plansIndicators.map((p) => {
              const active = selectedPlan === p.name;
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setSelectedPlan(p.name)}
                  aria-pressed={active}
                  className={[
                    'text-left rounded-2xl p-5 border',
                    active
                      ? 'border-blue-500 bg-[rgba(255,255,255,0.06)]'
                      : 'border-white/10 bg-[rgba(255,255,255,0.05)]',
                  ].join(' ')}
                >
                  <div className="flex items-center justify-between mb-3">
                    <Title variant="subtitle" className="">
                      {p.name}
                    </Title>
                    {p.name === 'Premium' && (
                      <span className="text-xs px-2 py-1 rounded-xl bg-[#2DB3C8] text-[#0E1626] font-semibold">
                        Recomendado
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline flex-col gap-2">
                    <span className="text-2xl font-bold block">
                      {currency.format(active ? p.value + addTotal : p.value)}
                    </span>
                    <span className="text-sm text-slate-300 block text-[rgba(255,255,255,0.6)]">
                      Por mês
                    </span>
                  </div>
                </button>
              );
            })}
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Title variant="h2" className="text-sm">
              Valor do veículo: {currency.format(vehicleValue)}
            </Title>

            <input
              type="range"
              min={10000}
              max={500000}
              step={1000}
              value={vehicleValue}
              onChange={(e) => setVehicleValue(Number(e.target.value))}
              aria-label="Valor do veículo"
              className="w-full h-2 rounded-full bg-slate-700 accent-[#2DB3C8]"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">R$ 10.000</span>
              <span className="text-xs text-slate-400">R$ 500.000</span>
            </div>
          </div>

          <div className="space-y-2">
            <Title variant="h2" className="text-sm">
              Idade do Cliente: {clientAge} anos
            </Title>
            <input
              type="range"
              min={18}
              max={90}
              step={1}
              value={clientAge}
              onChange={(e) => setClientAge(Number(e.target.value))}
              aria-label="Idade do cliente"
              className="w-full h-2 rounded-full bg-slate-700 accent-[#2DB3C8]"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">18 anos</span>
              <span className="text-xs text-slate-400">90 anos</span>
            </div>
          </div>

          <div className="space-y-3">
            <Title variant="h2" className="text-sm">
              Coberturas Adicionais
            </Title>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-2xl px-4 py-3 bg-[rgba(255,255,255,0.05)]">
                <Checkbox
                  checked={benefits.rouboFurto}
                  onChange={(c) => setBenefits({ ...benefits, rouboFurto: c })}
                  label="Cobertura contra roubo e furto"
                />
                <span className="text-sm text-slate-300">+ R$ 25,00</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl px-4 py-3 bg-[rgba(255,255,255,0.05)]">
                <Checkbox
                  checked={benefits.colisao}
                  onChange={(c) => setBenefits({ ...benefits, colisao: c })}
                  label="Danos por colisão"
                />
                <span className="text-sm text-slate-300">+ R$ 35,00</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl px-4 py-3 bg-[rgba(255,255,255,0.05)]">
                <Checkbox
                  checked={benefits.incendio}
                  onChange={(c) => setBenefits({ ...benefits, incendio: c })}
                  label="Cobertura contra incêndio"
                />
                <span className="text-sm text-slate-300">+ R$ 20,00</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl px-4 py-3 bg-[rgba(255,255,255,0.05)]">
                <Checkbox
                  checked={benefits.fenomenos}
                  onChange={(c) => setBenefits({ ...benefits, fenomenos: c })}
                  label="Fenômenos naturais (granizo, enchente)"
                />
                <span className="text-sm text-slate-300">+ R$ 30,00</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function PersonalizedPlans({
  isLoading,
  plansIndicators,
}: {
  isLoading?: boolean;
  plansIndicators?: SimulatorPlanIndicator[];
}) {
  return (
    <Suspense fallback={<PlanSkeleton />}>
      <PersonalizedPlansInner plansIndicators={plansIndicators} />
    </Suspense>
  );
}
