// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StockUser } from './StockUser'
import { Stock } from '@/types/stock'

const mockStocks: Stock[] = [
    {
        symbol: 'PETR4',
        shortName: 'PETR4',
        longName: 'Petrobras PN',
        regularMarketPrice: 30.50,
        regularMarketChangePercent: 2.5,
        logourl: '/logos/petr4.png',
        regularMarketVolume: 44732100
    },
    {
        symbol: 'VALE3',
        shortName: 'VALE3',
        longName: 'Vale ON',
        regularMarketPrice: 65.80,
        regularMarketChangePercent: -1.2,
        logourl: '/logos/vale3.png',
        regularMarketVolume: 44732100
    },
    {
        symbol: 'ITUB4',
        shortName: 'ITUB4',
        longName: 'Itaú Unibanco PN',
        regularMarketPrice: 28.90,
        regularMarketChangePercent: 0.5,
        logourl: '/logos/itub4.png',
        regularMarketVolume: 44732100
    },
]

describe('StockUser', () => {

    beforeEach(() => {
        vi.spyOn(Math, 'random').mockReturnValue(0.5)
    })

    describe('Random Quantity Generation', () => {

        it('should generate quantity between 10 and 59 for each stock', () => {
            render(<StockUser stock={mockStocks} />)

            const quantityElements = screen.getAllByText(/35 cotas/)
            expect(quantityElements).toHaveLength(mockStocks.length)
        })

        it('should generate different quantities when Math.random varies', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.1)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(0.9)

            render(<StockUser stock={mockStocks} />)

            expect(screen.getAllByText(/15 cotas/).length).toBeGreaterThan(0)
            expect(screen.getAllByText(/35 cotas/).length).toBeGreaterThan(0)
            expect(screen.getAllByText(/55 cotas/).length).toBeGreaterThan(0)
        })

        it('should guarantee minimum quantity of 10 shares', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0)

            render(<StockUser stock={mockStocks} />)

            const quantityElements = screen.getAllByText(/10 cotas/)
            expect(quantityElements).toHaveLength(mockStocks.length)
        })

        it('should guarantee maximum quantity of 59 shares', () => {
            vi.spyOn(Math, 'random').mockReturnValue(0.99)

            render(<StockUser stock={mockStocks} />)

            const quantityElements = screen.getAllByText(/59 cotas/)
            expect(quantityElements).toHaveLength(mockStocks.length)
        })
    })

    describe('Total Invested Calculation', () => {

        it('should recalculate total invested with different quantities', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.1)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(0.9)

            render(<StockUser stock={mockStocks} />)

            const totalInvested = 15 * 30.50 + 35 * 65.80 + 55 * 28.90
            expect(totalInvested).toBe(4350)
        })

        it('should handle decimal prices correctly', () => {
            const stocksWithDecimals: Stock[] = [
                { ...mockStocks[0], regularMarketPrice: 10.99 },
                { ...mockStocks[1], regularMarketPrice: 25.75 },
            ]

            render(<StockUser stock={stocksWithDecimals} />)

            const totalInvested = 35 * 10.99 + 35 * 25.75
            expect(totalInvested).toBeCloseTo(1285.9, 2)
        })
    })


    describe('DashboardBox Integration', () => {

        it('should pass correct values to DashboardBoxes', () => {
            render(<StockUser stock={mockStocks} />)

            expect(screen.getAllByText('Saldo').length).toBeGreaterThan(0)
            expect(screen.getAllByText('R$ 200,00').length).toBeGreaterThan(0)

            expect(screen.getAllByText('Investidos').length).toBeGreaterThan(0)
            expect(screen.getAllByText('R$ 4.382,00').length).toBeGreaterThan(0)

            expect(screen.getAllByText('cotas').length).toBeGreaterThan(0)
            expect(screen.getAllByText('105').length).toBeGreaterThan(0)
        })

        it('should render correct icons in each DashboardBox', () => {
            render(<StockUser stock={mockStocks} />)

            expect(screen.getAllByText('Saldo').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Investidos').length).toBeGreaterThan(0)
            expect(screen.getAllByText('cotas').length).toBeGreaterThan(0)
        })
    })

    describe('StockUserCard Rendering', () => {

        it('should render one card per stock', () => {
            render(<StockUser stock={mockStocks} />)

            expect(screen.getAllByText('PETR4').length).toBeGreaterThan(0)
            expect(screen.getAllByText('VALE3').length).toBeGreaterThan(0)
            expect(screen.getAllByText('ITUB4').length).toBeGreaterThan(0)
        })

        it('should pass correct quantity to each card', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.1)
                .mockReturnValueOnce(0.5)
                .mockReturnValueOnce(0.9)

            render(<StockUser stock={mockStocks} />)

            expect(screen.getAllByText(/15 cotas/).length).toBeGreaterThan(0)
            expect(screen.getAllByText(/35 cotas/).length).toBeGreaterThan(0)
            expect(screen.getAllByText(/55 cotas/).length).toBeGreaterThan(0)
        })
    })

    describe('Edge Cases', () => {

        it('should handle null stock', () => {
            render(<StockUser stock={null} />)

            expect(screen.getAllByText('Saldo').length).toBeGreaterThan(0)
            expect(screen.queryByText('PETR4')).not.toBeInTheDocument()
        })

        it('should handle empty array', () => {
            render(<StockUser stock={[]} />)

            const box = screen.getByText('cotas').parentElement?.parentElement
            expect(box).toHaveTextContent('0')
        })

        it('should handle a single stock', () => {
            render(<StockUser stock={[mockStocks[0]]} />)

            expect(screen.queryByText('105')).not.toBeInTheDocument()
            expect(screen.getAllByText('35').length).toBeGreaterThan(0)
        })

        it('should handle zero prices', () => {
            const stockWithZeroPrice: Stock[] = [
                { ...mockStocks[0], regularMarketPrice: 0 },
            ]

            render(<StockUser stock={stockWithZeroPrice} />)

            expect(screen.getAllByText('R$ 0,00').length).toBeGreaterThan(0)
        })
    })

    describe('Calculation Consistency', () => {

        it('total invested should equal sum of individual card totals', () => {
            vi.spyOn(Math, 'random')
                .mockReturnValueOnce(0.2)
                .mockReturnValueOnce(0.6)
                .mockReturnValueOnce(0.8)

            render(<StockUser stock={mockStocks} />)

            const petr4Total = 20 * 30.50
            const vale3Total = 40 * 65.80
            const itub4Total = 50 * 28.90

            const sumOfIndividuals = petr4Total + vale3Total + itub4Total
            expect(sumOfIndividuals).toBe(4687)

            expect(screen.getAllByText('R$ 610,00').length).toBeGreaterThan(0)
            expect(screen.getAllByText('R$ 2.632,00').length).toBeGreaterThan(0)
            expect(screen.getAllByText('R$ 1.445,00').length).toBeGreaterThan(0)
        })
    })
})