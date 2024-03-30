import Search from "@/components/search";
import {Button, Flex, Layout} from "antd";
import {BaseOptionType} from "rc-select/es/Select";
import getByHotelChains, {getHotelLocations} from "@/lib/actions";
import {getHotelChains} from "@/lib/actions";



export default async function Home() {
    return (
        <>
            <Flex justify={'space-between'} align={'center'} /*style={{backgroundColor: 'lightblue'}}*/>
                <h1>Hotels</h1>
                <Button type={'default'} size={'large'} href={'/login'}>Login</Button>
            </Flex>
            <Search locations={await getHotelLocations()}/>
        </>
    );
}
