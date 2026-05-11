import { Entry } from "@/app/generated/prisma";
import { proseStyle, badgeStyle } from "@/app/lib/prismaStyles";
import React from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { FindTotalDaysFromEntries } from "@/app/lib/actions";

interface FocusEntryProps {
  title: string;
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
  entries: Entry[];
}

const FocusMainCard: React.FC<FocusEntryProps> = async ({
  title,
  description,
  repositoryUrl,
  technologies,
  entries,
  isOnTIL = false,
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
      <div className="flex mt-6">
        <p className={badgeStyle}>
          {entries.length} entries across {daysSinceCreation.toString()} days
        </p>
        <p className={badgeStyle}>{ahaMoments.length} aha moment(s)</p>
      </div>
    </div>
  );
};

export default FocusMainCard;
