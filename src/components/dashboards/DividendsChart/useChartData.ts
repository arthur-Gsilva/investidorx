import { useMemo, useState } from 'react'

export type Dividends = {
    paymentDate: Date
    rate: number
    label: 'JCP' | 'DIVIDENDO'
}

interface ProcessedDividend {
    period: string
    dividendos: number
    jcp: number
}

export function useDividendsData(data: Dividends[]) {
    const [groupByYear, setGroupByYear] = useState(false)

    const processedData = useMemo(() => {
        const grouped = data.reduce((acc, item) => {
            const date = new Date(item.paymentDate)

            const key = groupByYear
                ? date.getFullYear().toString()
                : `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`

            if (!acc[key]) {
                acc[key] = {
                    period: key,
                    dividendos: 0,
                    jcp: 0,
                }
            }

            if (item.label === 'JCP') {
                acc[key].jcp += item.rate
            } else {
                acc[key].dividendos += item.rate
            }

            return acc
        }, {} as Record<string, ProcessedDividend>)

        return Object.values(grouped).sort((a, b) => {
            if (groupByYear) {
                return Number(a.period) - Number(b.period)
            } else {
                const [monthA, yearA] = a.period.split('/').map(Number)
                const [monthB, yearB] = b.period.split('/').map(Number)
                return yearA - yearB || monthA - monthB
            }
        })
    }, [data, groupByYear])

    const totals = useMemo(() => {
        return {
            dividendos: processedData.reduce((sum, item) => sum + item.dividendos, 0),
            jcp: processedData.reduce((sum, item) => sum + item.jcp, 0),
            total: processedData.reduce((sum, item) => sum + item.dividendos + item.jcp, 0),
            count: data.length,
        }
    }, [processedData, data.length])

    const formatPeriod = (period: string): string => {
        if (groupByYear) {
            return period
        }
        const [month, year] = period.split('/')
        const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
        return `${monthNames[parseInt(month) - 1]}/${year}`
    }

    return {
        chartData: processedData,
        totals,
        groupByYear,
        setGroupByYear,
        formatPeriod,
    }
}