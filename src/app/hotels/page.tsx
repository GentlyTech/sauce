import Filters from "@/components/filters";
import {useSearchParams} from "next/navigation";
import {BaseOptionType} from "rc-select/es/Select";
import {getHotelChains, getHotelLocations} from "@/lib/actions";



export default async function Page(){
    return(
        <>
            <h1>results...</h1>
            <Filters locations={await getHotelLocations()} hotelChains={await getHotelChains()}/>
        </>
    )

}