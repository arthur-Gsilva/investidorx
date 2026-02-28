import { Stock } from "@/types/stock";
import { DashboardBox } from "../dashboards/dashboardbox";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { AiFillBank } from "react-icons/ai";
import { AiOutlineStock } from "react-icons/ai";
import { StockUserCard } from "./StockUserCard";



export function StockUser({ stock }: { stock: Stock[] | null }) {

    const stocksWithQuantity = stock?.map(data => ({
        ...data,
        quantity: Math.floor(Math.random() * 50) + 10
    }));

    const safeStock = stocksWithQuantity ?? [];


    const totalInvested = safeStock.reduce((acc, stock) => {
        return acc + (stock.quantity * stock.regularMarketPrice);
    }, 0);


    const totalShares = safeStock.reduce((acc, stock) => acc + stock.quantity, 0);

    return (
        <div className="px-6 mx-auto max-w-7xl mt-10">
            <section className="grid grid-cols-3 gap-3">
                <DashboardBox
                    title="Saldo"
                    value={200}
                    Icon={AiFillBank}
                    isCurrency
                />
                <DashboardBox
                    title="Investidos"
                    value={totalInvested as number}
                    Icon={FaMoneyBillTrendUp}
                    isCurrency
                />
                <DashboardBox
                    title="cotas"
                    value={totalShares as number}
                    Icon={AiOutlineStock}
                />
            </section>

            <section className="mt-10">
                <h2 className="text-xl font-bold mb-2">Suas Ações:</h2>

                <div className="flex flex-col gap-3">
                    {stocksWithQuantity?.map((item) => (
                        <StockUserCard
                            key={item.longName}
                            data={item}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </section>
        </div>
    )
}