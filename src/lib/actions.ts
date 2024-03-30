'use server'


// import {signIn} from "@/auth";

import {BaseOptionType} from "rc-select/es/Select";
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

export default async function getByHotelChain(chainName : string) {
    const res = await fetch(`http://localhost:8080/hotel/info/byChain/${chainName}`);
    return res.json()
}

export async function getHotelChains() {
    const res =  await fetch("http://localhost:8080/hotelChain/info/chainNames")
    const resJson  = await res.json()
    const chainNames = [];

    for (let i = 0; i < resJson.length; i++) {
        chainNames.push({value: resJson[i].chainName})
    }

    return chainNames
}

export async function getHotelLocations() {
    const res = await fetch("http://localhost:8080/hotel/info/cities")
    const resJson = await res.json()
    const cities : BaseOptionType[] = [];

    for (let i = 0; i < resJson.length; i++) {
        cities.push({value: resJson[i]})
    }

    return cities
}

export async function bookRoom() {

}

export async function getAllHotels(): Promise<Hotel[] | undefined> {
  const response = await fetch(`${hostname}/hotel/info`);
  const json: Hotel[] | undefined = await response.json();
  return json;
}
