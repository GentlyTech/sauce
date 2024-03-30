import CustomCard from "@/components/custom-card";
import Search from "@/components/search";
import { Button, Flex, Layout } from "antd";

export default function Home() {
  return (
    <div className="w-100 h-100 p-2 overflow-hidden">
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

      <div className="flex flex-row gap-2">
        <CustomCard title="SomeHotel" body="Blah blah" img="" />
        <CustomCard title="SomeHotel" body="Blah blah" img="" />
        <CustomCard title="SomeHotel" body="Blah blah" img="" />
      </div>
    </div>
  );
}
