import Card from '@/components/ui/Cards';
import Title from '@/components/ui/Title';
import { currency } from '@/lib/utils/formatCurrency';

export default function SidebarPlans({
  isLoading,
  includedBenefits,
  plansIndicators,
}: {
  isLoading?: boolean;
  includedBenefits?: string[];
  plansIndicators?: SimulatorPlanIndicator[];
}) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="h-40 flex-center" aria-live="polite">
          <Title variant="default">Carregando indicadores...</Title>
        </Card>
      </div>
    );
  }

  if (!includedBenefits || !plansIndicators || plansIndicators.length === 0) {
    return (
      <div className="space-y-6">
        <Card className="h-40 flex-center" aria-live="polite">
          <Title variant="default">Dados de indicadores indisponíveis.</Title>
        </Card>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <Card className="py-10 px-8">
        <Title variant="h2">Benefícios Inclusos</Title>
        <div className="flex flex-wrap gap-2">
          {includedBenefits.map((b) => (
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
        {plansIndicators.map((p) => (
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
      </Card>
    </div>
  );
}
