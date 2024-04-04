"use server";
import {Button} from "antd";
import {hostname} from "@/lib/constants";
import {PlusCircleOutlined} from "@ant-design/icons";
import BookingTable from "@/components/BookingTable";
import {queryRooms} from "@/lib/actions";
import CustomCard from "@/components/custom-card";
import dayjs from "dayjs";
import './page.css'


export default async function Page({params}: {hotelId: string}) {

    const hotelId = params.hotelId
    //was cacheing data so api calls where not always up to date. no-cache ensures it does not cache data.
    const dataSource = await fetch(`${hostname}/booking/getDetailed/hotelId/${hotelId}`, {cache: 'no-store'})
    const data = await dataSource.json()

    let searchQuery: RoomQuery = {
        priceRange: null,
        chainName: null,
        checkInDate: dayjs().format('YYYY-MM-DD').toString(),
        checkOutDate: dayjs().add(1, 'day').format('YYYY-MM-DD').toString(),
        hotelName: null,
        location: null,
        rating: null,
        capacity: null,
        hotelId: hotelId
    };

    const searchResults = await queryRooms(searchQuery)
    console.log(searchResults)

    const hotelCards = searchResults!.map((result, index) => {
        const {room, hotel} = result;
        const thumbnailUrl = `${hostname}/thumbnail/hotel/${hotel.hotelId}`;
        console.log(hotel.rating)
        return (
            <CustomCard
                key={index}
                rating={hotel.rating}
                title={`${hotel.hotelName}: room: ${room.roomNumber}`}
                subtitle={`$${String(room.price)}`}
                body={`${room.viewType} for ${room.capacity} (${
                    room.extendable ? "extendable" : "not extendable"
                })`}
                img={thumbnailUrl}
                hotel={hotel}
                room={room}
                checkInDate={searchQuery.checkInDate!}
                checkOutDate={searchQuery.checkOutDate!}
                bookingStatus={"rented"}
            />
        );
    });
    return (
        <div className={"!w-full !h-full"}>
            <h1>Staff dashboard</h1>
            <BookingTable data={data}/>
            {/*    add search for rooms in hotel here!*/}
            <h2>Available rooms</h2>
            <div className="flex flex-row flex-wrap gap-2 !overflow-visible" style={{overflowY: 'auto'}}>
                {hotelCards}
            </div>
        </div>)
}

