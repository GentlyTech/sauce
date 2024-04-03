import Filters from "@/components/filters";
import {getHotelChains, getHotelLocations, queryRooms} from "@/lib/actions";
import CustomCard from "@/components/custom-card";
import {BaseOptionType} from "antd/es/select";
import {hostname} from "@/lib/constants";
import {useSearchParams} from "next/navigation";



let searchQuery: RoomQuery = {
    priceRange: null,
    chainName: null,
    checkInDate: null,
    checkOutDate: null,
    hotelName: null,
    location: null,
    rating: null,
    capacity: null
};


export default async function Page(
    {
        searchParams
    }: {
        searchParams?: {
            location?: string;
            chainName?: string;
            checkInDate?: string;
            checkOutDate?: string;
            minPrice?: number;
            maxPrice?: number;
            rating?: number;
            capacity?: number;
        },
    }) {

    // console.log(searchParams?.locations)

    let searchQuery: RoomQuery = {
        priceRange: [0, 10000],
        chainName: searchParams?.chainName!,
        checkInDate: searchParams?.checkInDate!,
        checkOutDate: searchParams?.checkInDate!,
        hotelName: searchParams?.chainName!,
        location: searchParams?.location!,
        rating: searchParams?.rating!,
        capacity: searchParams?.capacity!,
    };

    const locations = await getHotelLocations()
    const hotelChains = await getHotelChains()
    const searchResults = await queryRooms(searchQuery)

    const hotelCards = searchResults!.map((result, index) => {
        const {room, hotel} = result;
        const thumbnailUrl = `${hostname}/thumbnail/hotel/${hotel.hotelId}`;

        return (
            <CustomCard
                key={index}
                rating={hotel.rating}
                title={`${hotel.hotelName}`}
                subtitle={`$${String(room.price)}`}
                body={`${room.viewType} for ${room.capacity} (${
                    room.extendable ? "extendable" : "not extendable"
                })`}
                img={thumbnailUrl}
            />
        );
    });

    return (
        <div className="flex flex-row w-full h-full overflow-hidden box-border">
            <div className="flex flex-col mx-5">
                <h1>Room Search</h1>
                <Filters locations={locations} hotelChains={hotelChains}/>
            </div>
            <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border my-5">
                {hotelCards}
            </div>
        </div>
    );
}
