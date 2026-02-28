import { formatPrice } from "@/utils/formatters"
import { IconType } from "react-icons"

type Props = {
    value: number,
    title: string,
    Icon: IconType,
    isCurrency?: boolean
}

export function DashboardBox({ value, title, Icon, isCurrency = false }: Props) {

    return (
        <div className="bg-white rounded-xl shadow-2xl text-primary flex items-center gap-1 flex-col py-2 px-3">
            <Icon size={24}/>
            <div className="font-bold text-md">
                {isCurrency ? formatPrice(value) : value}
            </div>
            <div className="text-gray-600 text-sm opacity-80">{title}</div>
        </div>
    )
}