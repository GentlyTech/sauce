"use server";
import { BaseOptionType } from "rc-select/es/Select";
import { hostname } from "./constants";

export async function getByHotelChain(chainName: string) {
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

    const json = await res.json();

    for (let i = 0; i < json.length; i++) {
      chainNames.push({ value: json[i].chainName });
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
  query?: RoomQuery,
  limit?: number,
  offset?: number
): Promise<RoomQueryResult[]> {
  let results: RoomQueryResult[] = [];

  if (limit == null) {
    limit = 100; // probably shouldn't hardcode it here but eh
  }

  if (offset == null) {
    offset = 0;
  }

  try {
    const res = await fetch(
      `${hostname}/room/query?limit=${limit}&offset=${offset}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      }
    );

    if (!res.ok) return results;
    results = await res.json();
  } catch (error) {
    console.error(error);
  }

  return results;
}

export async function countRooms(query?: RoomQuery): Promise<number> {
  let count = 0;

  try {
    const res = await fetch(`${hostname}/room/query/count`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });

    if (!res.ok) return count;
    count = await res.json();
  } catch (error) {
    console.error(error);
  }

  return count;
}

export async function getBookingsFromHotel(hotelId: number) {
  let bookings: BookingQueryResult[] = [];

  try {
    const res = await fetch(
      `${hostname}/booking/getDetailed/hotelId/${hotelId}`,
      { cache: "no-store" }
    );
    if (!res.ok) return bookings;
    bookings = await res.json();
  } catch (error) {
    console.error(error);
  }

  return bookings;
}

export async function getRoomsAvailableInHotel(
  hotelId: number
): Promise<Room[]> {
  let rooms: Room[] = [];

  try {
    let res = await fetch(`${hostname}/room/info/${hotelId}`);
    if (!res.ok) return rooms;
    let roomsJson = await res.json();
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
    let res = await fetch(`${hostname}/room/info/byChain/${chainName}`);
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
    let res = await fetch(`${hostname}/room/info/byCity/${city}`);
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
    let res = await fetch(`${hostname}/room/info/byCapacity/${capacity}`);
    if (!res.ok) return undefined;
    rooms = await res.json();
  } catch (e) {
    console.log(e);
  }
  return rooms;
}

export async function bookRoom(
    booking: Booking
) {
    try {
        let res = await fetch(`${hostname}/booking/book`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking)
        })

        return res.ok;
    } catch (e) {
        console.log(e)
    }
    console.log(JSON.stringify(booking))
    return false;
}

export async function registerUser(user: string) {
  let result: number = -1;
  try {
    let res = await fetch(`${hostname}/customer/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: user,
    });

    if (!res.ok) return result;
    result = await res.json();
  } catch (e) {
    console.log(e);
  }

  return result;
}

export async function updateBookingStatus(booking: Booking, newStatus: string) {
  let query = {
    bookingId: booking,
    updatedBooking: {
      bookingStatus: newStatus,
    },
  };

  try {
    let res = await fetch(`${hostname}/booking/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
  } catch (e) {
    console.log(e);
  }
}

export async function login(hotelId: string, sin: string) {
  try {
    let res = await fetch(`${hostname}/employee/info/login/${hotelId}/${sin}`);
    let login = await res.json();
    console.log(login);
    if (!res.ok) return false;
    return login !== null;
  } catch (e) {
    console.log(e);
  }
  return false;
}
