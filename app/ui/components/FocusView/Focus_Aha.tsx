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

const Focus_Aha: React.FC<AhaEntryProps> = ({
  id,
  focus,
  commit,
  description,
  date,
}) => {
  const content = description;
  return (
    <Card className="border-chart-1 border-4 gap-1">
      <CardHeader>
        <div className="flex gap-2">
          <Lightbulb />
          <p className="font-bold">{date.toLocaleDateString()}</p>
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
    </Card>
  );
};

export default Focus_Aha;
