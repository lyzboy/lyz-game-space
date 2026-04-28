// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      <article
        className="
          prose prose-slate mt-3 max-w-none
          prose-p:my-2
          prose-h1:text-4xl
          prose-h2:text-3xl
          prose-h3:text-2xl
          prose-h4:text-xl
          prose-h5:text-lg
          prose-h6:text-base
          prose-headings:font-bold
          prose-headings:mb-2 prose-headings:mt-4
          prose-a:text-sky-600 hover:prose-a:underline
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:rounded-xl
          dark:prose-invert
          prose prose-slate max-w-none
        prose-headings:text-black
        prose-p:text-black
        prose-strong:text-black
        prose-em:text-black
        prose-li:text-black
        prose-a:text-black
        prose-blockquote:text-black
        "
      >
        <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
      </article>
    </div>
  );
};

export default Entry;
