"use server";
import React from 'react'
import {Table, Tag} from "antd";
import {hostname} from "@/lib/constants";
import {SearchOutlined} from "@ant-design/icons";
import {tag} from "postcss-selector-parser";
import BookingTable from "@/components/BookingTable";
import {headers} from "next/headers";

export default async function Page() {
    //was cacheing data so api calls where not always up to date. no-cache ensures it does not cache data.
    const dataSource = await fetch(`${hostname}/booking/getDetailed/hotelId/26`, {headers: {'Cache-Control':'no-cache'}})
    const data = await dataSource.json()
    return <BookingTable data={data}/>
}

