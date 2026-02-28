'use client'

import { Slider } from "@/components/ui/slider"
import { formatPrice } from "@/utils/formatters"
import { Stock } from "@/types/stock"

type Props = {
    stocks: Stock[]
    priceRange: [number, number]
    setPriceRange: (range: [number, number]) => void
    localPriceRange: [number, number]
    setLocalPriceRange: (range: [number, number]) => void
    globalPriceRange: [number, number]
}

export const PriceRange = ({
    stocks,
    setPriceRange,
    localPriceRange,
    setLocalPriceRange,
    globalPriceRange,
}: Props) => {
    
    const handleChange = (values: number[]) => {
        const [min, max] = values
        setLocalPriceRange([min, max])
    }

    const handleCommit = (values: number[]) => {
        const [min, max] = values
        if (max >= min) {
            setPriceRange([min, max])
        }
    }

    if (!stocks?.length || globalPriceRange[1] === 0) {
        return null
    }

    return (
        <div className="w-full max-w-50 space-y-4">
            <Slider
                value={localPriceRange}
                onValueChange={handleChange}
                onValueCommit={handleCommit}
                min={globalPriceRange[0]}
                max={globalPriceRange[1]}
                step={0.5}
                
            />

            <div className="flex justify-between text-sm text-muted-foreground">
                <span>{formatPrice(localPriceRange[0])}</span>
                <span>{formatPrice(localPriceRange[1])}</span>
            </div>
        </div>
    )
}
