'use client';
import React, {useState} from 'react'
import {Table, Tag} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import {updateBookingStatus} from "@/lib/actions";
import dayjs from "dayjs";


export default function BookingTable(data: any[]) {

    const [bookingStatus, setBookingStatus] = useState('')


    const columns = [
        {
            title: "Name",
            dataIndex: "customerName",
            filterIcon: <SearchOutlined/>,
            filterSearch: true
        },
        {
            title: "Customer id",
            dataIndex: "customerId"
        },
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
            title: "price",
            dataIndex: "price",
            render: (price: number, record: any[]) => (
                <p>
                    {(price * dayjs(record.checkOutDate).diff(record.checkInDate, 'day')).toFixed(2)}
                </p>
            ),
        },
        {
            title: "damage fee",
            dataIndex: "damageFee",
        },
        {
            title: "Room Number",
            dataIndex: "roomNumber"
        },
        {
            title: "Hotel Id",
            dataIndex: "hotelId"
        },
        {
            title: "Booking Status",
            dataIndex: "bookingStatus",
            render: (text: string, record: any[]) => (
                <Tag color={record.bookingStatus === 'rented' ? 'green' : 'blue'} onClick={() => {
                    let booking: Booking = {
                        checkInDate: record.checkInDate,
                        checkOutDate: record.checkOutDate,
                        hotelId: record.hotelId,
                        roomNumber: record.roomNumber
                    }
                    console.log(booking)
                    let newStatus = ''
                    if (record.bookingStatus === 'rented') {
                        newStatus = 'booked'
                    } else if (record.bookingStatus === 'booked') {
                        newStatus = 'rented'
                    }
                    updateBookingStatus(booking, newStatus).then((res) => {
                        record.bookingStatus = newStatus
                        setBookingStatus(newStatus);
                    })
                }
                }
                >{record.bookingStatus}
                </Tag>
            )
        }
    ]


    return (
        <>
            <Table columns={columns} dataSource={data.data}/>
        </>
    );
}