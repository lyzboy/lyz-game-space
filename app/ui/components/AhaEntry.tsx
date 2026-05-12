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
      className="border-2 p-4 rounded-2xl mt-1 mb-1 bg-amber-100 
    border-amber-200 flex flex-row justify-start content-center grow"
    >
      <div className="flex justify-center content-center flex-col">
        <div className="flex items-center">
          <div className="w-15 h-15 rounded-full border-blue-400 border-2 mr-3 flex justify-center items-center">
            <span className="material-symbols-outlined text-blue-400">
              lightbulb_2
            </span>
          </div>
          <p className="font-bold text-md">Focus: {focusName}</p>
        </div>

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
