// @vitest-environment jsdom

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StockUserCard } from './StockUserCard'
import { Stock } from '@/types/stock'

const mockStock: Stock = {
    symbol: 'PETR4',
    shortName: 'PETR4',
    longName: 'Petrobras PN',
    regularMarketPrice: 30.50,
    regularMarketChangePercent: 2.5,
    logourl: '/logos/petr4.png',
    regularMarketVolume: 44732100
}

describe('StockUserCard', () => {

    describe('Total Invested Calculation', () => {

        it('should correctly calculate: quantity * price', () => {
            const quantity = 35
            render(<StockUserCard data={mockStock} quantity={quantity} />)

            const expectedTotal = quantity * mockStock.regularMarketPrice
            expect(expectedTotal).toBe(1067.50)

            expect(screen.getAllByText('R$ 1.067,50').length).toBeGreaterThan(0)
        })

        it('should correctly calculate with decimal prices', () => {
            const stockWithDecimals = {
                ...mockStock,
                regularMarketPrice: 15.99,
            }

            render(<StockUserCard data={stockWithDecimals} quantity={25} />)

            const expectedTotal = 25 * 15.99
            expect(expectedTotal).toBeCloseTo(399.75, 2)

            expect(screen.getAllByText('R$ 399,75').length).toBeGreaterThan(0)
        })

        it('should calculate correctly when price is zero', () => {
            const stockWithZeroPrice = {
                ...mockStock,
                regularMarketPrice: 0,
            }

            render(<StockUserCard data={stockWithZeroPrice} quantity={10} />)

            expect(screen.getAllByText('R$ 0,00').length).toBeGreaterThan(0)
        })
    })


    describe('Quantity Display', () => {

        it('should display singular "cota" when quantity is 1', () => {
            render(<StockUserCard data={mockStock} quantity={1} />)

            expect(screen.getAllByText('1 cota').length).toBeGreaterThan(0)
            expect(screen.queryByText('1 cotas')).not.toBeInTheDocument()
        })

        it('should display plural "cotas" when quantity is greater than 1', () => {
            render(<StockUserCard data={mockStock} quantity={35} />)

            expect(screen.getAllByText('35 cotas').length).toBeGreaterThan(0)
            expect(screen.queryByText('35 cota')).not.toBeInTheDocument()
        })

        it('should display zero quantity', () => {
            render(<StockUserCard data={mockStock} quantity={0} />)

            expect(screen.getAllByText('0 cotas').length).toBeGreaterThan(0)
        })
    })


    describe('Stock Information Display', () => {

        it('should display short and long stock names', () => {
            render(<StockUserCard data={mockStock} quantity={10} />)

            expect(screen.getAllByText('PETR4').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Petrobras PN').length).toBeGreaterThan(0)
        })

        it('should display formatted current price', () => {
            render(<StockUserCard data={mockStock} quantity={10} />)

            expect(screen.getAllByText('R$ 30,50').length).toBeGreaterThan(0)
        })

        it('should render image with correct src and alt', () => {
            render(<StockUserCard data={mockStock} quantity={10} />)

            const image = screen.getByAltText('PETR4')
            expect(image).toHaveAttribute('src', expect.stringContaining('petr4.png'))
        })
    })


    describe('Price Variation Indicator', () => {

        it('should display green indicator for positive variation', () => {
            render(<StockUserCard data={mockStock} quantity={10} />)

            expect(screen.getAllByText('2.50%').length).toBeGreaterThan(0)

            const badge = screen.getAllByText('2.50%')[0].closest('div')
            expect(badge).toHaveClass('bg-green-100', 'text-green-700')
        })

        it('should display red indicator for negative variation', () => {
            const stockNegative = {
                ...mockStock,
                regularMarketChangePercent: -1.5,
            }

            render(<StockUserCard data={stockNegative} quantity={10} />)

            expect(screen.getAllByText('1.50%').length).toBeGreaterThan(0)

            const badge = screen.getAllByText('1.50%')[0].closest('div')
            expect(badge).toHaveClass('bg-red-100', 'text-red-700')
        })

        it('should display 0.00% when variation is zero', () => {
            const stockZero = {
                ...mockStock,
                regularMarketChangePercent: 0,
            }

            render(<StockUserCard data={stockZero} quantity={10} />)

            expect(screen.getAllByText('0.00%').length).toBeGreaterThan(0)

            const badge = screen.getAllByText('0.00%')[0].closest('div')
            expect(badge).toHaveClass('bg-green-100')
        })

        it('should default to 0 when regularMarketChangePercent is undefined', () => {
            const stockNoChange = {
                ...mockStock,
                regularMarketChangePercent: undefined,
            }

            //@ts-expect-error
            render(<StockUserCard data={stockNoChange} quantity={10} />)

            expect(screen.getAllByText('0.00%').length).toBeGreaterThan(0)
        })

        it('should format percentage with 2 decimal places', () => {
            const stockWithDecimals = {
                ...mockStock,
                regularMarketChangePercent: 3.456789,
            }

            render(<StockUserCard data={stockWithDecimals} quantity={10} />)

            expect(screen.getAllByText('3.46%').length).toBeGreaterThan(0)
            expect(screen.queryByText('3.456789%')).not.toBeInTheDocument()
        })
    })


    describe('Card Visual Structure', () => {

        it('should contain all main sections', () => {
            render(<StockUserCard data={mockStock} quantity={25} />)

            expect(screen.getAllByText('PETR4').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Petrobras PN').length).toBeGreaterThan(0)

            expect(screen.getAllByText('Preço Atual').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Quantidade').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Total Investido').length).toBeGreaterThan(0)
        })

        it('should render correct labels', () => {
            render(<StockUserCard data={mockStock} quantity={10} />)

            expect(screen.getAllByText('Preço Atual').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Quantidade').length).toBeGreaterThan(0)
            expect(screen.getAllByText('Total Investido').length).toBeGreaterThan(0)
        })
    })


    describe('Data Consistency', () => {

        it('total invested displayed should equal quantity * displayed price', () => {
            const quantity = 42
            const price = 30.50

            render(<StockUserCard data={mockStock} quantity={quantity} />)

            const expectedTotal = quantity * price
            expect(expectedTotal).toBe(1281.00)

            expect(screen.getAllByText('R$ 30,50').length).toBeGreaterThan(0)
            expect(screen.getAllByText('42 cotas').length).toBeGreaterThan(0)
            expect(screen.getAllByText('R$ 1.281,00').length).toBeGreaterThan(0)
        })
    })
})