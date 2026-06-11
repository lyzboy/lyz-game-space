"use client";

import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle } from "@/app/lib/styles";
import { ReactNode } from "react";

interface Focus_MarkdownRendererProps {
  content: string;
}

const Focus_MarkdownRenderer: React.FC<Focus_MarkdownRendererProps> = ({
  content,
}): ReactNode => {
  return (
    <article className={proseStyle}>
      <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </Markdown>
    </article>
  );
};

export default Focus_MarkdownRenderer;
