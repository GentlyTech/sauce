"use client";

import Filters from "@/components/filters";
import { getHotelChains, getHotelLocations, queryRooms } from "@/lib/actions";
import CustomCard from "@/components/custom-card";
import { useEffect, useState } from "react";
import { BaseOptionType } from "antd/es/select";

export default function Page() {
  const [locations, setLocations] = useState([] as BaseOptionType[]);
  const [hotelChains, setHotelChains] = useState([] as any[]); // bad practice but eh
  const [searchParams, setSearchParams] = useState(
    null as unknown as RoomQuery | undefined
  );
  const [searchResults, setSearchResults] = useState([] as RoomQueryResult[]);

  const updateSearchParams = async (searchParams?: RoomQuery) => {
    setSearchParams(searchParams);
  };

  useEffect(() => {
    getHotelLocations().then((data) => setLocations(data));
    getHotelChains().then((data) => setHotelChains(data));
    queryRooms(searchParams).then((data) => setSearchResults(data));
  }, [searchParams]);

  const hotelCards = searchResults!.map((result, index) => {
    const { room, hotel } = result;
    return (
      <CustomCard
        key={index}
        title={`${hotel.hotelName}`}
        subtitle={`$${String(room.price)} for Room ${String(room.roomNumber)}`}
        body={`${room.viewType} for ${room.capacity} (${
            room.extendable ? "extendable" : "not extendable"
        })`}
        img=""
      />
    );
  });

  return (
    <div className="flex flex-row w-full h-full overflow-hidden box-border">
      <div className="flex flex-col mx-5">
        <h1>Room Search</h1>
        <Filters
          locations={locations}
          hotelChains={hotelChains}
          onSubmit={updateSearchParams}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border my-5">
        {hotelCards}
      </div>
    </div>
  );
}
