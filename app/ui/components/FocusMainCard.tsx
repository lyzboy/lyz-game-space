import { Entry } from "@prisma/client";
import { proseStyle, badgeStyle } from "@/app/lib/styles";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { FindTotalDaysFromEntries } from "@/app/lib/actions";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FocusEntryProps {
  title: string;
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
  entries: Entry[];
  id: number;
}

const FocusMainCard: React.FC<FocusEntryProps> = async ({
  title,
  description,
  id,
  entries,
}) => {
  const ahaMoments = entries.filter((entry) => entry.isAha);
  const daysSinceCreation = await FindTotalDaysFromEntries(
    entries.map((entry) => {
      return entry.createdAt.toDateString();
    }),
  );
  return (
    <div>
      <h2 className="font-bold text-3xl">{title}</h2>
      <article className={proseStyle}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {description}
        </Markdown>
      </article>
      <div className="flex mt-6 flex-col md:flex-row">
        <p className={badgeStyle}>
          <span className="text-primary font-bold">{entries.length}</span>{" "}
          entries across{" "}
          <span className="text-primary font-bold">
            {daysSinceCreation.toString()}
          </span>{" "}
          days
        </p>
        <p className={badgeStyle}>
          <span className="text-primary font-bold">{ahaMoments.length}</span>{" "}
          aha moment(s)
        </p>
        <a
          href={`focuses/${id}`}
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "md:self-end text-center",
          )}
        >
          Visit Focus
        </a>
      </div>
    </div>
  );
};

export default FocusMainCard;
