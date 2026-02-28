import { ProcessedDividend } from '@/types/dividends'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DividendsTooltip } from './DividendsTooltip'


interface DividendsChartProps {
    data: ProcessedDividend[]
    formatPeriod: (period: string) => string
    groupByYear: boolean
}

export function DividendsChartView({ data, formatPeriod, groupByYear }: DividendsChartProps) {
    const formatYAxis = (value: number) => {
        return `R$ ${value.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        })}`
    }

    const chartData = data.map((item) => ({
        ...item,
        period: formatPeriod(item.period),
    }))

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: groupByYear ? 5 : 80 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

                <XAxis
                    dataKey="period"
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#d1d5db' }}
                    angle={groupByYear ? 0 : -45}
                    textAnchor={groupByYear ? 'middle' : 'end'}
                    height={groupByYear ? 30 : 80}
                />

                <YAxis
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    tickLine={{ stroke: '#d1d5db' }}
                    tickFormatter={formatYAxis}
                />

                <Tooltip content={<DividendsTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />

                <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" iconSize={10} />

                <Bar
                    dataKey="dividendos"
                    name="Dividendos"
                    fill="#10b981"
                    radius={[8, 8, 0, 0]}
                    stackId="stack"
                />

                <Bar dataKey="jcp" name="JCP" fill="#3b82f6" radius={[8, 8, 0, 0]} stackId="stack" />
            </BarChart>
        </ResponsiveContainer>
    )
}