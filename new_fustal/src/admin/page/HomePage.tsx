
import { ChartOverview } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";


export const HomePage = () => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 md:gap-6">
          <SectionCards />
          <div>
            <ChartOverview/>
          </div>
        </div>
      </div>
    </div>
  );
};
