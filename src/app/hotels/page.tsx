"use client";

import Filters from "@/components/filters";
import { getHotelChains, getHotelLocations, queryRooms } from "@/lib/actions";
import CustomCard, { RoomCard } from "@/components/custom-card";
import { useEffect, useState } from "react";
import { BaseOptionType } from "antd/es/select";

export default function Page() {
  const [locations, setLocations] = useState([] as BaseOptionType[]);
  const [hotelChains, setHotelChains] = useState([] as any[]); // bad practice but eh
  const [searchParams, setSearchParams] = useState(
    null as unknown as RoomQuery | undefined
  );
  const [rooms, setRooms] = useState([] as Room[]);

  const updateSearchParams = async (searchParams?: RoomQuery) => {
    setSearchParams(searchParams);
  };

  useEffect(() => {
    getHotelLocations().then((data) => setLocations(data));
    getHotelChains().then((data) => setHotelChains(data));
    queryRooms(searchParams).then((data) => setRooms(data));
  }, [searchParams]);

  const hotelCards = rooms!.map((room, index) => {
    return <CustomCard key={index} title={String(room.roomNumber)} subtitle={`$${String(room.price)}`} body={`${room.viewType} for ${room.capacity} (${room.extendable ? "extendable" : "not extendable"})`} img="" />;
  });

  return (
    <div className="flex flex-col w-full h-full p-2 overflow-hidden box-border">
      <h1>Results</h1>
      <div className={"flex col"}>
        <Filters
          locations={locations}
          hotelChains={hotelChains}
          onSubmit={updateSearchParams}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border">
        {hotelCards}
      </div>
    </div>
  );
}
