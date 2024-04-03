'use client';
import {Card, Rate} from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";

export default function CustomCard(props: CardProps) {
  const imgSrc = props.img != null ? props.img : "";

  const {push} = useRouter()

  return (
    <Card
      className="flex flex-col w-64 overflow-hidden hover:transform-gpu hover:scale-105 transition-transform cursor-pointer"
      onClick={() => {
          const params = new URLSearchParams();
          params.set('hotel', JSON.stringify(props.hotel));
          params.set('room', JSON.stringify(props.room));
          params.set('checkIn', props.checkInDate!)
          params.set('checkOut', props.checkOutDate!)
          console.log('checkIn')
          push(`${'/book'}?${params.toString()}`);
      }}
      styles={{
        body: {
          padding: 0,
        },
      }}>
      <Image alt="Preview of a hotel or hotel room" fill src={imgSrc} />
      <div className="absolute w-full h-full bg-gray-800 opacity-50" />
      <div className="flex flex-col relative w-full p-6 box-border text-white">
        <h2 className="w-full">{props.title}</h2>
        <h3 className="w-full">{props.subtitle}</h3>
        {props.rating != null ? <Rate disabled value={props.rating}/> : null}
        <p className="w-full">{props.body}</p>
      </div>
    </Card>
  );
}



interface CardProps {
  title: string;
  body: string;
  subtitle: string;
  rating?: number;
  img?: string;
  hotel?: Hotel;
  room?: Room;
  checkInDate?: string;
  checkOutDate?: string;
}
