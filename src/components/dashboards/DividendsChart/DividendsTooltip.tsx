interface CustomTooltipProps {
    active?: boolean
    payload?: Array<{
        name: string
        value: number
        color: string
    }>
    label?: string
}

export function DividendsTooltip({ active, payload, label }: CustomTooltipProps) {
    if (!active || !payload || !payload.length) {
        return null
    }

    const total = payload.reduce((sum, entry) => sum + (entry.value || 0), 0)

    return (
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-xl">
            <p className="mb-2 font-semibold text-gray-900">{label}</p>

            {payload.map((entry, index) => (
                <p key={index} className="text-sm" style={{ color: entry.color }}>
                    {entry.name}:{' '}
                    <span className="font-bold">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(entry.value || 0)}
                    </span>
                </p>
            ))}

            <div className="mt-2 border-t border-gray-200 pt-2">
                <p className="text-sm font-bold text-gray-900">
                    Total:{' '}
                    {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                    }).format(total)}
                </p>
            </div>
        </div>
    )
}