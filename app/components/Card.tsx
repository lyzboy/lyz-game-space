import React from "react";
import Image from "next/image";

interface CardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, image, description, link }) => {
  return (
    <div
      className="flex flex-col justify-center min-h-100 w-75 items-center
    text-center border-2 rounded-lg overflow-hidden "
    >
      <p className="p-5 bg-amber-50 w-[100%] mb-5 text-black font-extrabold">
        {title}
      </p>
      <Image
        src={image}
        width={200}
        height={200}
        alt="Image of rivers karate website"
        className="grow mb-5"
      />
      <p className="grow">{description}</p>
      <a href={link} target="_blank">
        Visit Site
      </a>
    </div>
  );
};

export default Card;
