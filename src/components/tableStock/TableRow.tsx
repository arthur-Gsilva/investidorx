import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Stock } from "@/types/stock"
import { formatDate, formatPrice } from "@/utils/formatters"
import Image from "next/image"

type Props = {
    stock: Stock,
    setModal: (a: Stock) => void
}

export const TableRowItem = ({stock, setModal}: Props) => {

    const lastDividends = stock.dividendsData?.cashDividends[0]

    return (
        <TableRow
            key={stock.shortName}
            className="hover:bg-gray-200 cursor-pointer"
            onClick={() => setModal(stock)}
        >
            <TableCell className="font-medium flex items-center gap-2">
                <Image
                    src={stock.logourl}
                    alt={stock.longName}
                    width={30}
                    height={30}
                    className="hidden md:block"
                />

                <span>{stock.symbol}</span>
            </TableCell>
            <TableCell>{formatPrice(stock.regularMarketVolume) || "Sem acesso"}</TableCell>
            <TableCell>{formatPrice(stock.regularMarketPrice)}</TableCell>
            <TableCell className={`${stock.regularMarketChangePercent > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.regularMarketChangePercent}
            </TableCell>
            <TableCell>
                {lastDividends?.paymentDate
                    ? formatDate(new Date(lastDividends.paymentDate))
                    : null}
            </TableCell>
            <TableCell>
                {formatPrice(lastDividends?.rate as number)}
            </TableCell>
        </TableRow>
    )
}