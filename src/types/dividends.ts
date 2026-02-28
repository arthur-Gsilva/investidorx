export type Dividends = {
    paymentDate: Date,
    rate: number,
    label: "JCP" | "DIVIDENDO"
}

export type dividendsData = {
    cashDividends: Dividends[]
}

export type ProcessedDividend = {
  period: string
  dividendos: number
  jcp: number
}