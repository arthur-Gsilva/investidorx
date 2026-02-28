'use client'

import { Stock } from '@/types/stock'
import { DividendFilter } from './DividendFilter'
import { PriceRange } from './PriceRange'

interface StockFiltersProps {
    stocks: Stock[]
    monthsFilter: number | null
    setMonthsFilter: (months: number | null) => void
    priceRange: [number, number]
    setPriceRange: (range: [number, number]) => void
    localPriceRange: [number, number]
    setLocalPriceRange: (range: [number, number]) => void
    globalPriceRange: [number, number]
}

export function StockFilters({
    stocks,
    setMonthsFilter,
    priceRange,
    setPriceRange,
    localPriceRange,
    setLocalPriceRange,
    globalPriceRange,
}: StockFiltersProps) {
    return (
        <div className="flex flex-col gap-5 md:flex-row items-center justify-between">
            <DividendFilter setValue={setMonthsFilter} />

            <PriceRange
                stocks={stocks}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                localPriceRange={localPriceRange}
                setLocalPriceRange={setLocalPriceRange}
                globalPriceRange={globalPriceRange}
            />
        </div>
    )
}
