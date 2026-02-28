'use client'

import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getTableStocks } from "@/services/stock"
import { Stock } from "@/types/stock"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { StockModal } from "../stocks/StockModal"
import { TableRowItem } from "./TableRow"
import { tableHeader } from "@/data/table"
import { useStockFilters } from "./filters/useStockFilters"
import { StockFilters } from "./filters/StockFilters"


export function TableStock() {
    const [selectedStock, setSelectedStock] = useState<Stock | null>(null)

    const { data: stocks, isLoading } = useQuery({
        queryKey: ['stocks'],
        queryFn: getTableStocks,
        staleTime: 6000
    })

    const {
        monthsFilter,
        setMonthsFilter,
        priceRange,
        setPriceRange,
        localPriceRange,
        setLocalPriceRange,
        globalPriceRange,
        filteredStocks,
    } = useStockFilters(stocks)

    return (
        <>
            <div className="flex flex-col gap-3">
                <StockFilters
                    stocks={stocks ?? []}
                    monthsFilter={monthsFilter}
                    setMonthsFilter={setMonthsFilter}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    localPriceRange={localPriceRange}
                    setLocalPriceRange={setLocalPriceRange}
                    globalPriceRange={globalPriceRange}
                />

                <Table className="bg-white text-gray-900">
                    <TableHeader className="bg-primary-dark border border-black text-white">
                        <TableRow>
                            {tableHeader.map((head) => (
                                <TableHead key={head} className="text-white">
                                    {head}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <td colSpan={tableHeader.length} className="text-center py-8">
                                    Carregando...
                                </td>
                            </TableRow>
                        ) : filteredStocks.length === 0 ? (
                            <TableRow>
                                <td colSpan={tableHeader.length} className="text-center py-8">
                                    Nenhuma ação encontrada com os filtros selecionados
                                </td>
                            </TableRow>
                        ) : (
                            filteredStocks.map((stock) => (
                                <TableRowItem
                                    key={stock.symbol}
                                    stock={stock}
                                    setModal={setSelectedStock}
                                />
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {selectedStock && (
                <StockModal stock={selectedStock} setClose={setSelectedStock} />
            )}
        </>
    )
}