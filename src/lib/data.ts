import { hostname } from "./constants";

export async function GetAllHotels(): Promise<Hotel[] | undefined> {
  const response = await fetch(`${hostname}/hotel/info`);
  const json: Hotel[] | undefined = await response.json();
  return json;
}
