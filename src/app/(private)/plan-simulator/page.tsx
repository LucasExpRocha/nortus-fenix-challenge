'use client';

import PersonalizedPlans from './_components/PersonalizedPlans';
import Sidebar from './_components/Sidebar';

const simulatorPlans = {
  includedBenefits: ['Tudo do básico', 'Carro reserva', 'Vidros'],
  plansIndicators: [
    {
      name: 'Básico',
      conversion: 75,
      roi: 80,
      value: 89.9,
    },
    {
      name: 'Intermediário',
      conversion: 48,
      roi: 114,
      value: 145.9,
    },
    {
      name: 'Premium',
      conversion: 25,
      roi: 176,
      value: 225.9,
    },
  ],
};

export default function PlanSimulator() {
  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <PersonalizedPlans plansIndicators={simulatorPlans.plansIndicators} />
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-6 h-full">
          <Sidebar
            includedBenefits={simulatorPlans.includedBenefits}
            plansIndicators={simulatorPlans.plansIndicators}
          />
        </div>
      </div>
    </div>
  );
}
