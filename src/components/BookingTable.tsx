"use client";
import React, { useState } from "react";
import { Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { updateBookingStatus } from "@/lib/actions";
import dayjs from "dayjs";

interface FlattenedBookingQueryResult {
  customerName?: string;
  customerId?: number;
  idType?: string;
  checkInDate?: string;
  checkOutDate?: string;
  price?: number;
  damageFee?: number;
  roomNumber?: number;
  hotelId?: number;
  bookingStatus?: string;
}

export default function BookingTable(props: { data: BookingQueryResult[] }) {
  const [bookingStatus, setBookingStatus] = useState("");

  const formattedDataSource: () => FlattenedBookingQueryResult[] = () => {
    return props.data.map((result, index) => {
      return {
        customerName: result.customer?.name,
        customerId: result.customer?.customerId,
        idType: result.customer?.idType,
        checkInDate: result.booking?.checkInDate,
        checkOutDate: result.booking?.checkOutDate,
        price: result.room?.price,
        damageFee: result.booking?.damageFee,
        roomNumber: result.booking?.roomNumber,
        hotelId: result.booking?.hotelId,
        bookingStatus: result.booking?.bookingStatus,
      };
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "customerName",
      filterIcon: <SearchOutlined />,
      filterSearch: true,
    },
    {
      title: "Customer ID",
      dataIndex: "customerId",
    },
    {
      title: "ID Type",
      dataIndex: "idType",
    },
    {
      title: "Check-in Date",
      dataIndex: "checkInDate",
    },
    {
      title: "Check-out Date",
      dataIndex: "checkOutDate",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: number, record: FlattenedBookingQueryResult) => (
        <p>
          {(
            price *
            dayjs(record?.checkOutDate).diff(
              record?.checkInDate,
              "day"
            )
          ).toFixed(2)}
        </p>
      ),
    },
    {
      title: "Damage Fee",
      dataIndex: "damageFee",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
    },
    {
      title: "Hotel ID",
      dataIndex: "hotelId",
    },
    {
      title: "Booking Status",
      dataIndex: "bookingStatus",
      render: (text: string, record: FlattenedBookingQueryResult) => (
        <Tag
          color={record?.bookingStatus === "rented" ? "green" : "blue"}
          onClick={() => {
            let booking: Booking = {
              checkInDate: record?.checkInDate,
              checkOutDate: record?.checkOutDate,
              hotelId: record?.hotelId,
              roomNumber: record?.roomNumber,
            };
            let newStatus = "";
            if (record?.bookingStatus === "rented") {
              newStatus = "booked";
            } else if (record?.bookingStatus === "booked") {
              newStatus = "rented";
            }

            updateBookingStatus(booking, newStatus).then(() => {
              if (record == null) return;
              record.bookingStatus = newStatus;
              setBookingStatus(newStatus);
            });
          }}
        >
          {record?.bookingStatus}
        </Tag>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={formattedDataSource()} />
    </>
  );
}
