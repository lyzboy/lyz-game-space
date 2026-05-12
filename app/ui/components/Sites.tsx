import React from "react";
import Card from "./Card";

interface CardObject {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Sites = () => {
  let cardArray: CardObject[] = [
    // {
    //   title: "My Portfolio",
    //   image: "/images/placeholder_view.png",
    //   description: "My portfolio website showcasing some of my latest work.",
    //   link: "https://lyzboy.github.io",
    // },
    {
      title: "Rivers Karate",
      image: "/images/rivers_karate.png",
      description: "The website for the karate dojo, River's Karate For Christ",
      link: "https://riverskarate.lyzgame.space",
    },
    {
      title: "Square Pool",
      image: "/images/square_pool.png",
      description: "A football pools site for family and fiends",
      link: "https://squarepool.lyzgame.space",
    },
    {
      title: "Lyz Notes",
      image: "/images/lyz_notes.png",
      description: "A note taking site created with the bookstack framework",
      link: "https://notes.lyzgame.space",
    },
    {
      title: "Lyz Tv",
      image: "/images/lyz_tv.png",
      description: "A tv watching website",
      link: "https://tv.lyzgame.space",
    },
    {
      title: "Lyz Diagrams",
      image: "/images/lyz_diagrams.png",
      description:
        "A diagram creation website utilizing the draw.io framework.",
      link: "https://diagrams.lyzgame.space",
    },
  ];

  return (
    <div
      className="grid md:grid-cols-2 p-10 justify-center content-center 
      justify-items-center items-stretch gap-10"
      id="sites"
    >
      {cardArray.map((cardItem) => {
        return (
          <Card
            key={cardItem.title}
            title={cardItem.title}
            image={cardItem.image}
            description={cardItem.description}
            link={cardItem.link}
          />
        );
      })}
    </div>
  );
};

export default Sites;
