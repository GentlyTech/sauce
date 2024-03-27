import Search from "@/components/search";
import {Button, Flex, Layout} from "antd";

export default function Home() {

    return (
        <>
            <Flex justify={'space-between'} align={'center'} /*style={{backgroundColor: 'lightblue'}}*/>
                <h1>Hotels</h1>
                <Button type={'default'} size={'large'} href={'/login'}>Login</Button>
            </Flex>

            <Search/>
        </>

    );
}
