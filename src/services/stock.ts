import { Stock } from "@/types/stock"

export const getUserStock = async (): Promise<Stock[] | null> => {
    try{
        const res = await fetch('https://brapi.dev/api/quote/ITUB4,PETR4,VALE3,MGLU3')
        const data = await res.json()
        return data.results
    } catch(error){
        console.error('problema na api', error)
        return null
    }
}

// Requisição teste sem token, apenas para não correr risco de atingir limite de requisições da API
export const getTest = async (): Promise<Stock[] | null> => {
    try{
        const res = await fetch('https://brapi.dev/api/quote/ITUB4,PETR4,VALE3,MGLU3?dividends=true')
        const data = await res.json()
        return data.results
    } catch(error){
        console.error('problema na api', error)
        return null
    }
}

export const getTableStocks = async (): Promise<Stock[] | null> => {
    const url = `https://brapi.dev/api/quote/ITUB4,PETR4,VALE3,MGLU3?dividends=true`

    try{
        const res = await fetch(url)
        const data = await res.json()
        return data.results
    } catch(error){
        console.log(url)
        console.error('problema na api', error)
        return null
    }
}