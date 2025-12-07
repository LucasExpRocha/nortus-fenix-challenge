'use client';

import simulatorPlans from '@/constants/simulator-plans';

import PersonalizedPlans from './_components/PersonalizedPlans';
import Sidebar from './_components/Sidebar';

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
