"use client";

// A TIL Feed entry

import { useState } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle } from "@/app/lib/styles";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteEntryButton from "../DeleteEntryButton";

import { ForwardRefEditor } from "../ForwardRefEditor";

import { useSession } from "next-auth/react";

interface EntryProps {
  id: number;
  focusId: number;
  date: string;
  description: string;
}

const Focus_Entry: React.FC<EntryProps> = ({
  date,
  description,
  id,
  focusId,
}) => {
  const { data: session } = useSession();
  const content = description;

  const [editing, setEditing] = useState(false);
  const [markdown, setMarkdown] = useState(content);

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const editableControls = () => {
    if (session?.user?.role === "ADMIN") {
      if (editing) {
        return (
          <>
            <Button variant="destructive" onClick={handleEditClick}>
              Cancel Edit
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Button onClick={handleEditClick}>Edit</Button>
            <DeleteEntryButton id={id} focusId={focusId} />
          </>
        );
      }
    }
    return;
  };

  const cardContent = () => {
    if (session?.user?.role === "ADMIN" && editing) {
      return (
        <div className="border-black border-2 rounded-md overflow-hidden grow-10">
          <ForwardRefEditor markdown={markdown} onChange={setMarkdown} />
        </div>
      );
    } else {
      return (
        <article className={proseStyle}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        </article>
      );
    }
  };

  return (
    <Card>
      <CardHeader>
        <p className="font-bold">{date}</p>
        {editableControls()}
      </CardHeader>
      <CardContent>{cardContent()}</CardContent>
    </Card>
  );
};

export default Focus_Entry;
