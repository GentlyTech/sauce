import { Card } from "antd";
import Image from "next/image";

export default function CustomCard(props: CardProps) {
  return (
    <Card className="flex flex-col mw-5">
      <Image className="w-100" alt="Preview of a hotel or hotel room" src={props.img ? props.img : ""} />
      <h2>{props.title ? props.title : "Title"}</h2>
      <caption>{props.body ? props.body : "Body"}</caption>
    </Card>
  );
}

interface CardProps {
  title?: string;
  body?: string;
  img?: string;
}
