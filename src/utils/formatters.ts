export const formatPrice = (value: number) => {

    if(typeof value != "number" ) return null

    return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value)
}

export const formatDate = (date: Date) => {
    if(!date) return null

    return Intl.DateTimeFormat('pt-BR', {
        year: "numeric",
        month: "numeric",
        day: "numeric"
    }).format(date)
}

export const formatDateMonthAndYear = (date: Date) => {
    if(!date) return null

    return Intl.DateTimeFormat('pt-BR', {
        year: "numeric",
        month: "short",
    }).format(date)
}