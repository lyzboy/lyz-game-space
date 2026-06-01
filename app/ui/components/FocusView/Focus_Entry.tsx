"use client";

// A TIL Feed entry

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useSession } from "next-auth/react";

import Focus_MarkdownRenderer from "./Focus_MarkdownRenderer";
import Focus_EntryForm from "./Focus_EntryForm";
import Focus_EditControls from "./Focus_EditControls";

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
      return (
        <Focus_EditControls
          isEditing={editing}
          entryId={id}
          focusId={focusId}
          handleEditClick={handleEditClick}
        />
      );
    }
    return;
  };

  const cardContent = () => {
    if (session?.user?.role === "ADMIN" && editing) {
      return (
        <Focus_EntryForm
          markdown={markdown}
          entryId={id}
          focusId={focusId}
          setMarkdown={setMarkdown}
          isEditing={setEditing}
        />
      );
    } else {
      return <Focus_MarkdownRenderer content={content} />;
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
