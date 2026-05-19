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
}

const Focus_Entry: React.FC<EntryProps> = ({ date, description }) => {
  const content = description;
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">{date.toLocaleDateString()}</p>
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
    </Card>
  );
};

export default Focus_Entry;
