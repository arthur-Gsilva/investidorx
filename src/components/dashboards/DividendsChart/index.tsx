import { Dividends } from "@/types/dividends"
import { DividendsHeader } from "./DividendsHeader"
import { useDividendsData } from "./useChartData"
import { DividendsChartView } from "./DividendsChartView"


interface DividendsChartProps {
    data: Dividends[]
}

export function DividendsChart({ data }: DividendsChartProps) {
    const { chartData, totals, groupByYear, setGroupByYear, formatPeriod } = useDividendsData(data)

    return (
        <div className="w-full rounded-xl bg-white p-6 shadow-md">
            <DividendsHeader
                totalAmount={totals.total}
                groupByYear={groupByYear}
                onGroupByYearChange={setGroupByYear}
            />

            <DividendsChartView data={chartData} formatPeriod={formatPeriod} groupByYear={groupByYear} />
        </div>
    )
}