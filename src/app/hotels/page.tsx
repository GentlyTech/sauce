"use client";
import Filters from "@/components/Filters";
import {
  countRooms,
  getHotelChains,
  getHotelLocations,
  queryRooms,
} from "@/lib/actions";
import DisplayCard, { DisplayCardProps } from "@/components/DisplayCard";
import { BaseOptionType } from "antd/es/select";
import { hostname } from "@/lib/constants";
import "./page.css";
import { useEffect, useState } from "react";
import { Pagination } from "antd";

const PAGE_SIZE = 25;

export default function Page({
  searchParams,
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
    hotelId?: number;
  };
}) {

  const [locations, setLocations] = useState([] as BaseOptionType[]);
  const [hotelChains, setHotelChains] = useState([] as BaseOptionType[]);
  const [searchResults, setSearchResults] = useState([] as RoomQueryResult[]);
  const [expectedResultCount, setExpectedResultCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const searchQuery: RoomQuery = {
      priceRange: [searchParams?.minPrice!, searchParams?.maxPrice!],
      chainName: searchParams?.chainName!,
      checkInDate: searchParams?.checkInDate!,
      checkOutDate: searchParams?.checkInDate!,
      location: searchParams?.location!,
      rating: searchParams?.rating!,
      capacity: searchParams?.capacity!,
      hotelId: searchParams?.hotelId!,
    };

    getHotelLocations().then((data) => setLocations(data));
    getHotelChains().then((data) => setHotelChains(data));
    countRooms(searchQuery).then((count) => {
      setExpectedResultCount(count);
    });
    queryRooms(searchQuery, undefined, (page - 1) * PAGE_SIZE).then((data) =>
      setSearchResults(data)
    );
  }, [
    page,
    searchParams?.capacity,
    searchParams?.chainName,
    searchParams?.checkInDate,
    searchParams?.hotelId,
    searchParams?.location,
    searchParams?.maxPrice,
    searchParams?.minPrice,
    searchParams?.rating,
  ]);

  const pageChanged = (page: number, pageSize: number) => {
    setPage(page);
  };

  const hotelCards = searchResults!.map((result, index) => {
    const { room, hotel } = result;
    const thumbnailUrl = `${hostname}/thumbnail/hotel/${hotel.hotelId}`;
    
    const onCardClick: DisplayCardProps["onClick"] = (router) => {
      const params = new URLSearchParams();
      params.set("hotel", JSON.stringify(hotel));
      params.set("room", JSON.stringify(room));
      params.set("checkIn", searchParams?.checkInDate!)
      params.set("checkOut", searchParams?.checkOutDate!)
      params.set("bookingStatus", "booked")
      router.push(`/book?${params.toString()}`);
    };

    return (
      <DisplayCard
        key={index}
        rating={hotel.rating}
        title={`${hotel.hotelName}`}
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
    <div className="flex flex-row w-full h-full overflow-hidden box-border">
      <div className="flex flex-col mx-5">
        <h1>Room Search</h1>
        <Filters locations={locations} hotelChains={hotelChains} />
      </div>
      <div className="flex flex-col items-center my-5 w-full gap-2">
        <div className="flex flex-row flex-wrap gap-2 overflow-y-auto w-full">
          {hotelCards}
        </div>
        <Pagination
          style={{
            marginTop: "auto",
          }}
          total={expectedResultCount}
          pageSize={PAGE_SIZE}
          showSizeChanger={false}
          onChange={pageChanged}
          hideOnSinglePage
        />
      </div>
    </div>
  );
}
