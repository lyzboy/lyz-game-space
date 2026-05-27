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
import { BookOpenText } from "lucide-react";

interface EntryProps {
  date: Date;
  description: string;
  focusId: number;
}

const TIL_Entry: React.FC<EntryProps> = ({ date, description, focusId }) => {
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
        <a
          href={`/focuses/${focusId}`}
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "self-end",
          )}
        >
          <BookOpenText data-icon="inline-start" />
          View Entry
        </a>
      </CardFooter>
    </Card>
  );
};

export default TIL_Entry;
