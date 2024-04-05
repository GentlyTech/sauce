import DisplayCard from "@/components/DisplayCard";
import Search from "@/components/Search";
import { getAllHotels, getHotelLocations } from "@/lib/actions";
import { hostname } from "@/lib/constants";
import {Button, Flex, Layout} from "antd";


export default async function Home() {
  const hotels = await getAllHotels();
  let locations = await getHotelLocations();

  const hotelCards = hotels?.map((hotel, index) => {
    const thumbnailUrl = `${hostname}/thumbnail/hotel/${hotel.hotelId}`;

    return (
      <DisplayCard
        key={hotel.hotelId}
        title={hotel.hotelName}
        subtitle=""
        rating={hotel.rating}
        body={`${hotel.address.street}, ${hotel.address.city}, ${hotel.address.province} ${hotel.address.postalCode}, ${hotel.address.country}`}
        img={thumbnailUrl}
      />
    );
  });

  return (
    <div className="flex flex-col w-full h-full p-2 overflow-hidden box-border">
      <Flex
        justify={"space-between"}
        align={"center"} /*style={{backgroundColor: 'lightblue'}}*/
      >
        <h1>Hotels</h1>
        <Button type={"default"} size={"large"} href={"/login"}>
          Login
        </Button>
      </Flex>
      <div className="flex flex-col items-center">
        <Search locations={locations} />
      </div>

      <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border">
        {hotelCards}
      </div>
    </div>
  );
}
