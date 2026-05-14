import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ExternalLink } from "lucide-react";

interface CardProps {
  title: string;
  image: string;
  description: string;
  link: string;
}

const SiteCard: React.FC<CardProps> = ({ title, image, description, link }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} width={400} height={200} alt={description} />
      </CardContent>
      <CardFooter>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "w-full font-black",
          )}
        >
          <ExternalLink data-icon="inline-start" />
          Visit Site
        </a>
      </CardFooter>
    </Card>
  );
};

export default SiteCard;
