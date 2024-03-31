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
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export async function getRoomsByLocation(city : string) {
    const res = await fetch(`http://localhost:8080/hotel/info/byChain/${city}`);
    return res.json()
}


export async function getHotelChains() {
  const chainNames = [];

  try {
    const res = await fetch(`${hostname}/hotelChain/info/chainNames`);
    if (!res.ok) return [];

    const resJson = await res.json();

    for (let i = 0; i < resJson.length; i++) {
      chainNames.push({ value: resJson[i].chainName });
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

export async function getBookingsFromHotel(hotelId: number) {

}

export async function getRoomsAvailableInHotel(hotelId: number){
    return await fetch(`http://localhost:8080/room/info/${hotelId}`)
}

export async function bookRoom(roomNumber: number, hotelId: number, customerId: number) {
    //TODO do this
}