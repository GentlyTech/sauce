"use client";
import { Button, Pagination } from "antd";
import { PAGE_SIZE, hostname } from "@/lib/constants";
import { PlusCircleOutlined } from "@ant-design/icons";
import {
  countRooms,
  getBookingsFromHotel,
  getHotelChains,
  getHotelLocations,
  queryRooms,
} from "@/lib/actions";
import { useEffect, useState } from "react";
import BookingTable from "@/components/BookingTable";
import dayjs from "dayjs";
import DisplayCard, { DisplayCardProps } from "@/components/DisplayCard";
import { useParams } from "next/navigation";

export default function Page() {
  const [bookings, setBookings] = useState([] as BookingQueryResult[]);
  const [availableRooms, setAvailableRooms] = useState([] as RoomQueryResult[]);
  const [expectedRoomCount, setExpectedRoomCount] = useState(0);
  const [page, setPage] = useState(1);

  const { hotelId } = useParams<{ hotelId: string }>();

  let searchQuery: RoomQuery = {
    checkInDate: dayjs().format("YYYY-MM-DD").toString(),
    checkOutDate: dayjs().add(1, "day").format("YYYY-MM-DD").toString(),
    hotelId: Number(hotelId),
  };

  useEffect(() => {
    const searchQuery: RoomQuery = {
      hotelId: Number(hotelId),
    };

    getBookingsFromHotel(Number(hotelId)).then((bookings) => {
      setBookings(bookings);
    });
    countRooms(searchQuery).then((count) => {
      setExpectedRoomCount(count);
    });
    queryRooms(searchQuery, undefined, (page - 1) * PAGE_SIZE).then((rooms) =>
      setAvailableRooms(rooms)
    );
  }, [hotelId, page]);

  const pageChanged = (page: number, pageSize: number) => {
    setPage(page);
  };

  const hotelCards = availableRooms!.map((result, index) => {
    const { room, hotel } = result;
    const thumbnailUrl = `${hostname}/thumbnail/room/${hotel.hotelId}`;

    const onCardClick: DisplayCardProps["onClick"] = (router) => {
      const params = new URLSearchParams();
      params.set("hotel", JSON.stringify(hotel));
      params.set("room", JSON.stringify(room));
      params.set("checkIn", searchQuery?.checkInDate!);
      params.set("checkOut", searchQuery?.checkOutDate!);
      params.set("bookingStatus", "booked");
      router.push(`/book?${params.toString()}`);
    };

    return (
      <DisplayCard
        key={index}
        rating={hotel.rating}
        title={`${hotel.hotelName} (Room ${room.roomNumber})`}
        subtitle={`$${String(room.price)}`}
        body={`${room.viewType} for ${room.capacity} (${
          room.extendable ? "extendable" : "not extendable"
        })`}
        img={thumbnailUrl}
        onClick={onCardClick}
      />
    );
  });
  return (
    <div className="flex flex-col px-2 w-full h-full overflow-hidden box-border">
      <div className="flex flex-col h-1/4">
        <h1>Staff Dashboard</h1>
        <BookingTable data={bookings} />
      </div>
      <div className="flex flex-col overflow-hidden">
        {/*    add search for rooms in hotel here!*/}
        <h2>Available Rooms</h2>
        <div className="flex flex-col items-center w-full mb-5 gap-2 overflow-hidden">
          <div className="flex flex-row flex-wrap gap-2 overflow-y-auto w-full">
            {hotelCards}
          </div>
          <Pagination
            style={{
              marginTop: "auto",
            }}
            total={expectedRoomCount}
            pageSize={PAGE_SIZE}
            showSizeChanger={false}
            onChange={pageChanged}
            hideOnSinglePage
          />
        </div>
      </div>
    </div>
  );
}
