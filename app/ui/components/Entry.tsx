// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle } from "@/app/lib/prismaStyles";

interface EntryProps {
  date: Date;
  description: string;
  isShort: boolean;
}

const Entry: React.FC<EntryProps> = ({ date, description, isShort }) => {
  const content = isShort ? formatShortDescription(description) : description;
  return (
    <div className="border-2 p-2 rounded-2xl">
      <p className="font-bold">Entry Date: {date.toDateString()}</p>
      <article className={proseStyle}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </Markdown>
      </article>
    </div>
  );
};

export default Entry;
