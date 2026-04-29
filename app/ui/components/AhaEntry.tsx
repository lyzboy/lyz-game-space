import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
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
  text-md
  prose-p:my-2
  prose-h1:text-3xl
  prose-h2:text-2xl
  prose-h3:text-xl
  prose-h4:text-base 
  prose-h4:bg-red-200 
  prose-h4:inline
  prose-h4:p-2
  prose-h4:rounded-md
  prose-h5:text-base
  prose-h5:bg-blue-200 
  prose-h5:inline
  prose-h5:p-2
  prose-h5:rounded-md
  prose-h6:text-base
  prose-h6:bg-green-200 
  prose-h6:inline
  prose-h6:p-2
  prose-h6:rounded-md
  prose-headings:font-bold
  prose-headings:mb-2
  prose-headings:mt-4
  prose-a:text-sky-600
  hover:prose-a:underline
  prose-code:before:content-none
  prose-code:after:content-none
  prose-pre:rounded-xl
  dark:prose-invert
  prose-headings:text-black
  prose-p:text-black
  prose-strong:text-black
  prose-em:text-black
  prose-li:text-black
  prose-a:text-black
  prose-blockquote:text-black
  prose-code:text-slate-800
  prose-pre:bg-slate-100 prose-pre:text-slate-800

        "
        >
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        </article>
      </div>
    </div>
  );
};

export default AhaEntry;
