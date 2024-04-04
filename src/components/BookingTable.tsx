'use client';
import React, {useState} from 'react'
import {Table, Tag} from "antd";
import {hostname} from "@/lib/constants";
import {SearchOutlined} from "@ant-design/icons";
import {id, tag} from "postcss-selector-parser";
import {updateBookingStatus} from "@/lib/actions";


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
            <h1>Staff dashboard</h1>
            <Table columns={columns} dataSource={data.data}/>
        </>
    );
}