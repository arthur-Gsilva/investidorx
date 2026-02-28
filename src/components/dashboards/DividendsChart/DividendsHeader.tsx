interface DividendsHeaderProps {
    totalAmount: number
    groupByYear: boolean
    onGroupByYearChange: (value: boolean) => void
}

export function DividendsHeader({
    totalAmount,
    groupByYear,
    onGroupByYearChange
}: DividendsHeaderProps) {
    return (
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h3 className="text-2xl font-bold text-primary">Dividendos Recebidos</h3>
                <p className="mt-1 text-sm text-gray-500">
                    Histórico de dividendos e JCP por período
                </p>
            </div>

            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className="text-sm text-gray-500">Total Geral</p>
                    <p className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }).format(totalAmount)}
                    </p>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2">
                    <input
                        type="checkbox"
                        id="groupByYear"
                        checked={groupByYear}
                        onChange={(e) => onGroupByYearChange(e.target.checked)}
                        className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-500 transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    />
                    <label
                        htmlFor="groupByYear"
                        className="cursor-pointer select-none text-sm font-medium text-gray-700"
                    >
                        Agrupar por ano
                    </label>
                </div>
            </div>
        </div>
    )
}