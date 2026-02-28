import { Dividends } from "@/types/dividends"

export const getDividends = async (symbol: string,range?: number): Promise<Dividends[]> => {

    const params = new URLSearchParams({ symbol })

    if (range !== undefined) {
        params.append("range", String(range))
    }

    const result = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/dividends?${params}`
    )

    const data = await result.json()

    return data?.dividends ?? []
}