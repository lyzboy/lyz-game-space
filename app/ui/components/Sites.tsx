import React from "react";
import SiteCard from "./SiteCard";

interface CardObject {
  title: string;
  image: string;
  description: string;
  link: string;
}

const Sites = () => {
  const cardArray: CardObject[] = [
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
      description: "A football pools site for family and friends",
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
    <div className="flex flex-col justify-center items-center pt-8">
      <h3 className="font-bold bg-light-foreground w-full p-6 text-center shadow-xl mb-8">
        Sites:
      </h3>
      <div
        className="grid md:grid-cols-2 lg:p-10 justify-center content-center 
      justify-items-center items-stretch gap-10 scroll-mt-40"
        id="sites"
      >
        {cardArray.map((cardItem) => {
          return (
            <SiteCard
              key={cardItem.title}
              title={cardItem.title}
              image={cardItem.image}
              description={cardItem.description}
              link={cardItem.link}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Sites;
