import {Table} from "antd";
import {hostname} from "@/lib/constants";
import {SearchOutlined} from "@ant-design/icons";

export default async function Page() {

    const dataSource = await fetch(`${hostname}/booking/getDetailed/hotelId/2`)
    const data = await dataSource.json()

    const columns = [
        {
            title: "Name",
            dataIndex: "customerName",
            filterIcon: <SearchOutlined/>,
            filterSearch: true
        },
        // {
        //     title: "Address"
        // },
        {
            title: "id type",
            dataIndex: "idType"
        },
        {
            title: "check in date",
            dataIndex: "checkInDate"
        },
        {
            title: "check out date",
            dataIndex: "checkOutDate"
        },
        {
            title: "Booking Status",
            dataIndex: "bookingStatus"
        }
    ]

    return (
        <>
            <h1>Staff dashboard</h1>
            <Table columns={columns} dataSource={data}/>
        </>
    );
}