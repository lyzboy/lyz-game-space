import React from "react";
import Image from "next/image";
import { buttonStyle } from "@/app/lib/prismaStyles";

interface CardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, link }) => {
  return (
    <div
      className="flex flex-col justify-center min-h-100  items-center
    text-center shadow-lg rounded-lg overflow-hidden bg-white"
    >
      <p className="p-5 bg-gray-100 w-[100%] mb-5 text-black font-extrabold">
        {title}
      </p>
      <Image
        src={image}
        width={400}
        height={200}
        alt="Image of rivers karate website"
        className="grow mb-5"
      />
      <p className="grow p-5">{description}</p>
      <a
        href={link}
        target="_blank"
        className={`${buttonStyle} m-5`}
        // className="m-5 hover:bg-blue-400 p-3
        // rounded-md hover:text-white font-bold bg-white
        // text-blue-400 border-blue-400  border"
      >
        Visit Site
      </a>
    </div>
  );
};

export default Card;
