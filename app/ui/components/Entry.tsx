// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle, buttonStyle } from "@/app/lib/styles";

interface EntryProps {
  date: Date;
  description: string;
  isShort: boolean;
}

const Entry: React.FC<EntryProps> = ({ date, description, isShort }) => {
  const content = isShort ? formatShortDescription(description) : description;
  return (
    <>
      <article className={proseStyle}>
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {content}
        </Markdown>
      </article>
      <div className="flex justify-between items-center ">
        <p className="font-bold">{date.toLocaleDateString()}</p>
        <a className={`${buttonStyle}`} href="">
          View Entry
        </a>
      </div>
    </>
  );
};

export default Entry;
