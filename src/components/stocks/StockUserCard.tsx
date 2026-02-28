import { Stock } from "@/types/stock"
import { formatPrice } from "@/utils/formatters"
import Image from "next/image"
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti"

type Props = {
    data: Stock,
    quantity: number
}

export const StockUserCard = ({ data, quantity }: Props) => {
    const totalInvested = quantity * data.regularMarketPrice;
    const priceChange = data.regularMarketChangePercent || 0;
    const isPositive = priceChange >= 0;


    return (
        <div
            className="group relative overflow-hidden rounded-xl bg-white p-5  shadow-md transition-all duration-200 hover:shadow-2xl"
        >
            <div className="mb-4 flex items-start gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-primary">
                    <Image
                        src={data.logourl}
                        alt={data.shortName}
                        fill
                        className="object-contain p-1"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-gray-900">
                        {data.shortName}
                    </h3>
                    <p className="truncate text-sm text-gray-500">
                        {data.longName}
                    </p>
                </div>

                <div className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${isPositive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}>
                    {isPositive ? (
                        <TiArrowSortedUp size={12} />
                    ) : (
                        <TiArrowSortedDown size={12} />
                    )}
                    {Math.abs(priceChange).toFixed(2)}%
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                    <span className="text-sm text-gray-600">Preço Atual</span>
                    <span className="font-semibold text-gray-900">
                        {formatPrice(data.regularMarketPrice)}
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                    <span className="text-sm text-gray-600">Quantidade</span>
                    <span className="font-semibold text-gray-900">
                        {quantity} {quantity === 1 ? 'cota' : 'cotas'}
                    </span>
                </div>

                <div className="flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2">
                    <span className="text-sm font-medium text-primary">Total Investido</span>
                    <span className="text-lg font-bold text-primary">
                        {formatPrice(totalInvested)}
                    </span>
                </div>
            </div>

        </div>

    )
}