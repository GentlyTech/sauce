import {Table} from "antd";

export default function Page() {

    const columns = [
        {
            title: "Name"
        },
        {
            title: "Address"
        },
        {
            title: "id type"
        },
        {
            title: "check in date"
        },
        {
            title: "check out date"
        },
        {
            title: "Booking Status"
        }
    ]

    return (
        <>
            <h1>Staff dashboard</h1>
            <Table columns={columns}/>
        </>
    );
}