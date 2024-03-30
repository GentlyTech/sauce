import CustomCard from "@/components/custom-card";
import Search from "@/components/search";
import { GetAllHotels } from "@/lib/data";
import { Button, Flex, Layout } from "antd";

export default async function Home() {
  const hotels = await GetAllHotels();

  const hotelCards = hotels?.map((hotel, index) => {
    return <CustomCard key={hotel.hotelId} title={hotel.hotelName} subtitle="" body={`${hotel.address.street}, ${hotel.address.city}, ${hotel.address.province} ${hotel.address.postalCode}, ${hotel.address.country}`} img="" />;
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
        <Search />
      </div>

      <div className="flex flex-row flex-wrap gap-2 overflow-y-auto box-border">{hotelCards}</div>
    </div>
  );
}
