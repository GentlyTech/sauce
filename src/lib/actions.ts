"use server";

// import {signIn} from "@/auth";

import { BaseOptionType } from "rc-select/es/Select";
import { hostname } from "./constants";

export async function authenticate(_currentState: unknown, formData: FormData) {
  // try {
  //     await signIn('credentials', formData)
  // } catch (error) {
  //     if (error) {
  //         switch (error.type) {
  //             case 'CredentialsSignin':
  //                 return 'Invalid credentials.'
  //             default:
  //                 return 'Something went wrong.'
  //         }
  //     }
  //     throw error
  // }
}

export default async function getByHotelChain(chainName: string) {
  try {
    const res = await fetch(`${hostname}/hotel/info/byChain/${chainName}`);
    if (!res.ok) return undefined;
    return await res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getHotelChains() {
  const chainNames: BaseOptionType[] = [];

  try {
    const res = await fetch(`${hostname}/hotelChain/info/chainNames`);
    if (!res.ok) return [];

    const json: string[] = await res.json();

    for (let i = 0; i < json.length; i++) {
      chainNames.push({ value: json[i] });
    }

  } catch (error) {
    console.error(error);
  }

  return chainNames;
}

export async function getHotelLocations() {
  const cities: BaseOptionType[] = [];

  try {
    const res = await fetch(`${hostname}/hotel/info/cities`);
    if (!res.ok) return [];

    const resJson = await res.json();

    for (let i = 0; i < resJson.length; i++) {
      cities.push({ value: resJson[i] });
    }
  } catch (error) {
    console.error(error);
  }

  return cities;
}

export async function getAllHotels(): Promise<Hotel[] | undefined> {
  let hotels: Hotel[] = [];

  try {
    const res = await fetch(`${hostname}/hotel/info`);
    if (!res.ok) return undefined;
    hotels = await res.json();
  } catch (error) {
    console.error(error);
  }

  return hotels;
}

export async function queryRooms(
  query?: RoomQuery
): Promise<RoomQueryResult[]> {
  let results: RoomQueryResult[] = [];
  if (query == null) {
    query = {
      priceRange: null,
      chainName: null,
      checkInDate: null,
      checkOutDate: null,
      hotelName: null,
      location: null,
      rating: null,
      capacity: null,
    };
  }

  try {
    const res = await fetch(`${hostname}/room/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    console.log(query)
    if (!res.ok) return results;
    results = await res.json();
  } catch (error) {
    console.error(error);
  }

  return results;
}

export async function getBookingsFromHotel(hotelId: number) {}

export async function getRoomsAvailableInHotel(
  hotelId: number
): Promise<Room[] | undefined> {
  let rooms: Room[] = [];

  try {
    let res = await fetch(`http://localhost:8080/room/info/${hotelId}`);
    if (!res.ok) return undefined;
    let roomsJson = await res.json();

    for (let i = 0; i < roomsJson.length; i++) {
      console.log(roomsJson[i]);
      //rooms.push(roomsJson[i])
    }
  } catch (e) {
    console.log(e);
  }

  return rooms;
}

export async function getRoomsAvailableInHotelChain(
  chainName: String
): Promise<Room[] | undefined> {
  let rooms: Room[] = [];

  try {
    let res = await fetch(
      `http://localhost:8080/room/info/byChain/${chainName}`
    );
    if (!res.ok) return undefined;
    rooms = await res.json();
  } catch (e) {
    console.log(e);
  }
  return rooms;
}

export async function getRoomsByCity(
  city: String
): Promise<Room[] | undefined> {
  let rooms: Room[] = [];

  try {
    let res = await fetch(`http://localhost:8080/room/info/byCity/${city}`);
    if (!res.ok) return undefined;
    rooms = await res.json();
  } catch (e) {
    console.log(e);
  }
  return rooms;
}

export async function getRoomsByCapacity(
  capacity: number
): Promise<Room[] | undefined> {
  let rooms: Room[] = [];

  try {
    let res = await fetch(
      `http://localhost:8080/room/info/byCapacity/${capacity}`
    );
    if (!res.ok) return undefined;
    rooms = await res.json();
  } catch (e) {
    console.log(e);
  }
  return rooms;
}

export async function bookRoom(
  roomNumber: number,
  hotelId: number,
  customerId: number
) {
  //TODO do this
}
