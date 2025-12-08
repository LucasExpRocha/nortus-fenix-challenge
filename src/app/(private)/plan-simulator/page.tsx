'use client';

import { useQuery } from '@tanstack/react-query';

import { planSimulatorService } from '@/app/services/plan-simulator.service';

import PersonalizedPlans from './_components/PersonalizedPlans';
import SidebarPlans from './_components/SidebarPlans';

export default function PlanSimulator() {
  const { data: planSimulator, isLoading: isLoadingPlanSimulator } = useQuery({
    queryKey: ['planSimulator'],
    queryFn: planSimulatorService.getPlans,
    structuralSharing: true,
    retry: 2,
    retryDelay: 1000,
    staleTime: 10 * 1000,
    gcTime: 5 * 60 * 1000,
  });

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-12 gap-4 2xl:gap-10">
        <div className="col-span-12 lg:col-span-8">
          <PersonalizedPlans
            isLoading={isLoadingPlanSimulator}
            plansIndicators={planSimulator?.plansIndicators}
          />
        </div>
        <div className="col-span-12 lg:col-span-4 h-full">
          <SidebarPlans
            isLoading={isLoadingPlanSimulator}
            includedBenefits={planSimulator?.includedBenefits}
            plansIndicators={planSimulator?.plansIndicators}
          />
        </div>
      </div>
    </div>
  );
}
