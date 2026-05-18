// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle, buttonStyle } from "@/app/lib/styles";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SquareArrowOutUpRight } from "lucide-react";

interface EntryProps {
  date: Date;
  description: string;
  id: number;
}

const TIL_Entry: React.FC<EntryProps> = ({ date, description, id }) => {
  const content = formatShortDescription(description);
  return (
    <Card>
      <CardHeader>
        <p className="text-muted-foreground font-bold">Latest Entry:</p>
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
      <CardFooter className="flex justify-between items-center w-full">
        <p className="font-bold">{date.toLocaleDateString()}</p>
        <a
          href={`/focuses/${id}`}
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-end",
          )}
        >
          <SquareArrowOutUpRight data-icon="inline-start" />
          View Entry
        </a>
      </CardFooter>
    </Card>
  );
};

export default TIL_Entry;
