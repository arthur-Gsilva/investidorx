import { StockUser } from "@/components/stocks/StockUser"
import { getUserStock } from "@/services/stock"

export default async function page(){

    const data = await getUserStock()

    return(
        <div>
            <StockUser stock={data}/>
        </div>
    )
}