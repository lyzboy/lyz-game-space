import { formatShortDescription } from "@/app/lib/utils";
import { proseStyle } from "@/app/lib/prismaStyles";
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
        <p className="font-bold text-md">Focus: {focusName}</p>
        {commit ? (
          <a href="#" className="text-blue-400">
            Commit: {commit}
          </a>
        ) : (
          ""
        )}
        <article className={proseStyle}>
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
