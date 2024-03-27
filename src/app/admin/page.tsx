import {Table} from "antd";

export default function Page() {

    const columns = [
        {
            title: "Name"
        },
        {
            title: "Booking Status"
        }
    ]

    return(
        <>
            <h1>Staff dashboard</h1>
            <Table columns={columns}/>
        </>
    );
}