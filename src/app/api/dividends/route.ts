import { Dividends } from "@/types/dividends"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const symbol = searchParams.get("symbol")
    const range = searchParams.get("range") ?? "max"

    if (!symbol) return Response.json({ msg: "Precisa enviar alguma ação." }, { status: 400 })

    const result = await fetch(`https://brapi.dev/api/quote/${symbol}?dividends=true`, {
        headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_BRAPI_TOKEN}`
        }
    })

    // const result = await fetch(`https://brapi.dev/api/quote/${symbol}?dividends=true`)
    const data = await result.json()

    if (!data) return Response.json({ msg: "Ação não encontrada!" }, { status: 404 })

    const dividendsData: Dividends[] = data.results[0].dividendsData.cashDividends

    let filtered = dividendsData

    if (range !== "max") {
        const years = Number(range)

        if (![2, 5].includes(years)) {
            return Response.json(
                { msg: "Range inválido. Use 2, 5 ou max." },
                { status: 400 }
            )
        }

        const limitDate = new Date()
        limitDate.setFullYear(limitDate.getFullYear() - years)

        filtered = dividendsData.filter((dividend) => {
            const paymentDate = new Date(dividend.paymentDate)
            return paymentDate >= limitDate
        })

        return Response.json({ dividends: filtered })
    }

    return Response.json(
      {
        dividends: filtered
      },
      { status: 200 }
    )
}