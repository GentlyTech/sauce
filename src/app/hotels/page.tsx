import Filters from "@/components/filters";
import {useSearchParams} from "next/navigation";
import {BaseOptionType} from "rc-select/es/Select";
import {
    getHotelChains,
    getHotelLocations,
    getRoomsAvailableInHotel,
    getRoomsAvailableInHotelChain,
} from "@/lib/actions";
import {RoomCard} from "@/components/custom-card";
import {Flex, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";




export default async function Page({searchParams}: {searchParams:{ [key: string]: string } }){

    let rooms = await getRoomsAvailableInHotelChain(searchParams.hotelChain)
    let hotelCards = rooms!.map((room, index) => {
        return (
            <RoomCard key={index} room={room}/>
        )
    })

    return(
        <div className="flex flex-col w-full h-full p-2 overflow-hidden box-border">
            {/*<Layout>*/}
            {/*    <Sider>*/}
            {/*        <Filters locations={await getHotelLocations()} hotelChains={await getHotelChains()}/>*/}
            {/*    </Sider>*/}
            {/*    <Content>*/}
            {/*        <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border">*/}
            {/*            {hotelCards}*/}
            {/*        </div>*/}
            {/*    </Content>*/}
            {/*</Layout>*/}

            <h1>Results</h1>
            <div className={"flex col"}>
                <Filters locations={await getHotelLocations()} hotelChains={await getHotelChains()}/>
            </div>
            <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border">
                {hotelCards}
            </div>
        </div>
    )

}