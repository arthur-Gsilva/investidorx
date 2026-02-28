import { dividendsData } from "./dividends"


export type Stock =  {
    logourl: string,
    longName: string,
    symbol: string,
    regularMarketPrice: number,
    regularMarketVolume: number,
    shortName: string,
    regularMarketChangePercent: number,
    dividendsData?: dividendsData
}