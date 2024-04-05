'use client';
import {Card, Rate} from "antd";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";

export interface DisplayCardProps {
  title: string;
  body: string;
  subtitle: string;
  rating?: number;
  img?: string;
  onClick?: (router: AppRouterInstance) => void
}

export default function DisplayCard(props: DisplayCardProps) {
  const imgSrc = props.img != null ? props.img : "";
  const router = useRouter();

  return (
    <Card
      className="flex flex-col w-64 h-80 overflow-hidden hover:transform-gpu hover:scale-105 transition-transform cursor-pointer"
      onClick={() => props.onClick ? props.onClick(router) : undefined}
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
