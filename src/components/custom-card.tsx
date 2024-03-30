import { Card } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function CustomCard(props: CardProps) {
  return (
    <Card className="flex flex-col w-64">
      <Image className="w-100" alt="Preview of a hotel or hotel room" src={props.img} />
      <h2 className="w-100">{props.title}</h2>
      <h3 className="w-100">{props.subtitle}</h3>
      <p className="w-100">{props.body}</p>
    </Card>
  );
}

interface CardProps {
  title: string;
  body: string;
  subtitle: string;
  img: string;
}
