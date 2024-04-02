import {Card, Rate} from "antd";
import Image from "next/image";
import {useEffect, useState} from "react";

export default function CustomCard(props: CardProps) {
    const imgSrc = props.img != null ? props.img : "";

    return (
        <Card className="flex flex-col w-64">
            <Image className="w-100" alt="Preview of a hotel or hotel room" fill src={imgSrc}/>
            <h2 className="w-100">{props.title}</h2>
            <h3 className="w-100">{props.subtitle}</h3>
            <Rate disabled defaultValue={props.rating}/>
            <p className="w-100">{props.body}</p>
        </Card>
    );
}

interface CardProps {
    title: string;
    body: string;
    rating: number
    subtitle: string;
    img?: string;
}
