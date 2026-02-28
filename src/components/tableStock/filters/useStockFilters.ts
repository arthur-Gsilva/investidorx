'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Stock } from '@/types/stock'

export function useStockFilters(stocks: Stock[] | null | undefined) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([0, 0])

    const monthsFilter = searchParams.get('months') ? Number(searchParams.get('months')) : null
    const urlMinPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null
    const urlMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null

    const globalPriceRange = (() => {
        if (!stocks?.length) return [0, 0] as [number, number]

        const prices = stocks.map(s => s.regularMarketPrice ?? 0)
        const min = Math.min(...prices)
        const max = Math.max(...prices)

        return [min, max] as [number, number]
    })()

    useEffect(() => {
        if (stocks?.length && globalPriceRange[1] > 0) {
            const min = urlMinPrice ?? globalPriceRange[0]
            const max = urlMaxPrice ?? globalPriceRange[1]
            setLocalPriceRange([min, max])
        }
    }, [stocks, globalPriceRange, urlMinPrice, urlMaxPrice])

    const updateURL = (params: Record<string, string | null>) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()))

        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === '') {
                current.delete(key)
            } else {
                current.set(key, value)
            }
        })

        const search = current.toString()
        const query = search ? `?${search}` : ''

        router.push(`${pathname}${query}`, { scroll: false })
    }

    const setMonthsFilter = (months: number | null) => {
        updateURL({ months: months?.toString() ?? null })
    }

    const setPriceRange = (range: [number, number]) => {
        setLocalPriceRange(range)
        updateURL({
            minPrice: range[0].toString(),
            maxPrice: range[1].toString(),
        })
    }

    const filteredStocks = (() => {
        if (!stocks) return []

        return stocks.filter(stock => {
            if (monthsFilter) {
                if (!stock.dividendsData?.cashDividends?.length) return false

                const lastDividend = stock.dividendsData.cashDividends[0]
                const paymentDate = new Date(lastDividend.paymentDate)
                const limitDate = new Date()
                limitDate.setMonth(limitDate.getMonth() - monthsFilter)

                if (paymentDate < limitDate) return false
            }

            if (urlMinPrice !== null && urlMaxPrice !== null) {
                const price = stock.regularMarketPrice ?? 0
                if (price < urlMinPrice || price > urlMaxPrice) return false
            }

            return true
        })
    })()

    return {
        monthsFilter,
        priceRange: [urlMinPrice ?? globalPriceRange[0], urlMaxPrice ?? globalPriceRange[1]] as [number, number],
        localPriceRange,
        globalPriceRange,

        setMonthsFilter,
        setPriceRange,
        setLocalPriceRange,

        filteredStocks,
    }
}