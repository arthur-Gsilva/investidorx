import { Stock } from "@/types/stock"
import { DividendsChart } from "../dashboards/DividendsChart"
import { useState } from "react"
import { getDividends } from "@/services/dividends"
import { useQuery } from "@tanstack/react-query"
import { toast } from "sonner"
import { SkeletonBox } from "../skeletons/SkeletonBox"

type Props = {
    stock: Stock,
    setClose: (a: null) => void
}

export const StockModal = ({ stock, setClose }: Props) => {

    const [range, setRange] = useState<number | undefined>(2)

    const { data: dividends, isLoading } = useQuery({
        queryKey: [stock.symbol, range],
        queryFn: () => getDividends(stock.symbol, range),
        staleTime: 6000
    })



    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setClose(null)}
        >
            <div
                className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200 text-black p-8"
                onClick={(e) => e.stopPropagation()}
            >

                <div>
                    <div className="mb-4 flex items-center justify-between">
                        <h4 className="text-primary font-bold text-xl">
                            {stock.shortName}
                        </h4>

                        <div className="flex flex-col items-center ">
                            <div className="flex items-center gap-4 text-sm sm:text-md">
                                <button
                                    onClick={() => setRange(2)}
                                    className="cursor-pointer"
                                >
                                    2 anos
                                </button>

                                <button
                                    onClick={() => setRange(5)}
                                    className="cursor-pointer"
                                >
                                    5 anos
                                </button>

                                <button
                                    onClick={() => setRange(undefined)}
                                    className="cursor-pointer"
                                >
                                    Máximo
                                </button>
                            </div>

                            <div
                                className="w-full flex"
                                style={{
                                    justifyContent:
                                        range === 2
                                            ? "flex-start"
                                            : range === 5
                                                ? "center"
                                                : "flex-end"
                                }}
                            >
                                <div className="w-1/3 bg-primary h-0.5"></div>
                            </div>
                        </div>
                    </div>

                    {!dividends && !isLoading &&
                        <p className="text-gray-500">Sem dados de dividendos disponíveis.</p>
                    }

                    {isLoading &&
                        <SkeletonBox />
                    }

                    {dividends &&
                        <DividendsChart data={dividends} />
                    }

                </div>

                <div className="mt-2 flex gap-4 items-center flex-col sm:flex-row">
                    <input
                        type="number" name="qt" id="qt"
                        className="border-2 outline-0 rounded-md border-primary-dark text-black pl-3 py-1"
                        placeholder="Digite uma quantidade"
                    />
                    <button
                        className="bg-primary-dark p-2 rounded-md text-white cursor-pointer transition-all duration-300 hover:opacity-80"
                        onClick={() => {
                            toast.error("Simulando um erro de API")
                        }}
                    >
                        Comprar
                    </button>
                </div>
            </div>
        </div>
    )
}