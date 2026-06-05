import { formatShortDescription } from "@/app/lib/utils";
import { proseStyle } from "@/app/lib/styles";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { BookMarked, ExternalLink, Lightbulb } from "lucide-react";
import { Focus } from "@/app/generated/prisma";

interface AhaEntryProps {
  id: number;
  focus: Focus;
  commit: string;
  description: string;
  date: Date;
}

const TIL_AhaEntry: React.FC<AhaEntryProps> = ({
  id,
  focus,
  commit,
  description,
  date,
}) => {
  const content = formatShortDescription(description);
  return (
    <Card className="border-chart-1 border-4 gap-1">
      <CardHeader>
        <div className="flex gap-2">
          <Lightbulb />
          <p className="text-muted-foreground font-bold">
            Focus: {focus.title}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <article className={proseStyle}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        </article>
      </CardContent>
      <CardFooter
        className="
          flex 
          lg:justify-between
          lg:flex-row 
          lg:items-center 
          items-end
          justify-center 
          flex-col 
          w-full 
          gap-2
        "
      >
        <p className="font-bold">{date.toLocaleDateString()}</p>

        {commit === "" || commit === "private" ? (
          <a
            href={`/focuses/${focus.id}`}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "self-end",
            )}
          >
            <BookMarked data-icon="inline-start" />
            View Focus
          </a>
        ) : (
          <div className="flex">
            <a
              href={`/focuses/${focus.id}`}
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "self-end",
              )}
            >
              <BookMarked data-icon="inline-start" />
              View Focus
            </a>
            <a
              href={`https://${focus.repositoryUrl}/commit/${commit}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "self-end",
              )}
            >
              <ExternalLink data-icon="inline-start" />
              View Commit
            </a>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default TIL_AhaEntry;
