import { formatDate, formatPrice } from "./formatters"

describe("formatPrice", () => {
    it("formata número para BRL corretamente", () => {
        expect(formatPrice(1000)?.replace(/\u00A0/g, " ")).toBe("R$ 1.000,00")
    })

    it("should return cents", () => {
        expect(formatPrice(0.0213)?.replace(/\u00A0/g, " ")).toBe("R$ 0,02")
    })

    it("should return null", () => {
        //@ts-expect-error erro apenas para testar
        expect(formatPrice("123")).toBe(null)
    })
})


describe("formatDate", () => {

    const date = new Date("2026-01-30T03:00:00.000Z")
    it("should return a valid date", () => {
        expect(formatDate(date)).toBe("30/01/2026")
    })
})