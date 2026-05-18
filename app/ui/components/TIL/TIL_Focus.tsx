import { cn } from "@/lib/utils";
import { formatShortDescription } from "@/app/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";

interface FocusEntryProps {
  id: number;
  title: string;
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
}

const TIL_Focus: React.FC<FocusEntryProps> = ({
  id,
  title,
  description,
  repositoryUrl,
  technologies,
  isOnTIL = false,
}) => {
  const formattedUrl = repositoryUrl.startsWith("http")
    ? repositoryUrl
    : `https://${repositoryUrl}`;
  return (
    <Card className="p-6">
      <CardHeader>
        <p className="text-muted-foreground font-bold">Current Focus:</p>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">
          {formatShortDescription(description)}
        </CardDescription>
        {technologies.map((technology) => {
          return (
            <Badge key={technology.id} variant={"secondary"}>
              {technology.name}
            </Badge>
          );
        })}
      </CardContent>
      <CardFooter>
        <a
          href={`/focuses/${id}`}
          className={buttonVariants({
            size: "lg",
          })}
        >
          <SquareArrowOutUpRight data-icon="inline-start" />
          Quick View
        </a>
      </CardFooter>
    </Card>
  );
};

export default TIL_Focus;
