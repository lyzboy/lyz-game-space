import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AhaEntryProps {
  focusName: string;
  commit: string;
  description: string;
  isShort: boolean;
}

const AhaEntry: React.FC<AhaEntryProps> = ({
  focusName,
  commit,
  description,
  isShort,
}) => {
  const content = isShort ? formatShortDescription(description) : description;
  return (
    <div
      className="border-2 p-2 rounded-2xl mt-1 mb-1 bg-amber-100 
    border-amber-200 flex flex-row justify-start content-center"
    >
      <div className="mr-4 p-3 flex justify-center content-center">
        <p className="text-4xl mt-auto mb-auto">!</p>
      </div>
      <div className="flex justify-center content-center flex-col">
        <p>Focus: {focusName}</p>
        <a href="#" className="text-blue-400">
          Commit: {commit}
        </a>
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
    </div>
  );
};

export default AhaEntry;
