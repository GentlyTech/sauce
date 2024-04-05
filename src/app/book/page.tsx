'use client'
import BookingForm from "@/components/BookingForm";
import dayjs from "dayjs";

export default function Page({searchParams}: {
    searchParams: {
        hotel: string
        room: string
        checkIn: string
        checkOut: string
        bookingStatus: string
    }
}) {


    const hotel = JSON.parse(searchParams?.hotel);
    const room = JSON.parse(searchParams?.room);

    return (
        <div className="px-2 overflow-y-auto">
            <h1>Reserve</h1>
            <p><b>Hotel Chain:</b> {hotel.owner}</p>
            <p><b>Address:</b></p>
            <p>{hotel.address.street}, {hotel.address.postalCode}</p>
            <p>{hotel.address.city}, {hotel.address.country}</p>
            <p><b>Capacity:</b> {room.capacity}</p>
            <p><b>Room number:</b> {room.roomNumber}</p>
            <p><b>Check in date: </b>{searchParams.checkIn}</p>
            <p><b>Check out date: </b>{searchParams.checkOut}</p>
            <BookingForm room={room} checkInDate={searchParams.checkIn} checkOutDate={searchParams.checkOut}
                         bookingStatus={searchParams.bookingStatus}/>
        </div>
    )
}