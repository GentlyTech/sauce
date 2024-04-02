import Filters from "@/components/filters";
import {useSearchParams} from "next/navigation";
import {BaseOptionType} from "rc-select/es/Select";
import {
    getHotelChains,
    getHotelLocations,
    getRoomsAvailableInHotel,
    getRoomsAvailableInHotelChain, getRoomsByCapacity, getRoomsByCity,
} from "@/lib/actions";
import {RoomCard} from "@/components/custom-card";
import {Flex, Layout} from "antd";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
import {element} from "prop-types";


export default async function Page({searchParams}: { searchParams: { [key: string]: string } }) {

    let rooms: Room[] | undefined = await getRoomsByCity(searchParams.location)
    let roomsByCapacity = await getRoomsByCapacity(parseInt(searchParams.guests))
    function compare(r1: Room|undefined, r2: Room|undefined) : boolean {
        return r1!.hotelId === r2!.hotelId && r1!.roomNumber === r2!.roomNumber
    }


    rooms = rooms?.filter((room): room is Room => {
        for (let i = 0; i < roomsByCapacity!.length; i++) {
            if (compare(room, roomsByCapacity![i])) {
                return true
            }
        }
        return false
    });

    // rooms = rooms?.filter((room): room is Room => roomsByCapacity?.includes());

    console.log(rooms)


    // console.log(rooms)
    // if (searchParams.location != undefined) {
    //     rooms = await getRoomsByCity(searchParams.location)
    // }
    //
    // if (searchParams.checkIn != undefined && searchParams.checkOut != undefined) {
    //
    // }
    //
    // if (searchParams.guests != undefined) {
    //
    //     return rooms


        //get just filter by capacity
        // rooms = rooms?.filter((room) => {
        //     return room.capacity === parseInt(searchParams.guests)
        // });
    // }

    // if (searchParams.hotelChain != undefined) {
    //     let roomsByHotelChain = await getRoomsAvailableInHotelChain(searchParams.hotelChain)
    //     rooms = rooms?.filter((room) => {
    //         return roomsByHotelChain.includes(room)
    //     })
    // }

    let hotelCards = rooms!.map((room, index) => {
        return (
            <RoomCard key={index} room={room}/>
        )
    })

    return (
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