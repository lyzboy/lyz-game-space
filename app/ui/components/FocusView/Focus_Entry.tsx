"use client";

// A TIL Feed entry

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { useSession } from "next-auth/react";

import Focus_MarkdownRenderer from "./Focus_MarkdownRenderer";
import Focus_EntryForm from "./Focus_EntryForm";
import Focus_EditControls from "./Focus_EditControls";
import { Button, buttonVariants } from "@/components/ui/button";
import { CircleSlash, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface EntryProps {
  id: number;
  focusId: number;
  focusRepo: string;
  date: string;
  description: string;
  commit: string;
}

const Focus_Entry: React.FC<EntryProps> = ({
  date,
  description,
  id,
  focusId,
  commit,
  focusRepo,
}) => {
  const { data: session } = useSession();
  const content = description;

  const [editing, setEditing] = useState(false);
  const [markdown, setMarkdown] = useState(content);

  const [usedCommit, setUsedCommit] = useState(commit);

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
          commit={usedCommit}
          setCommit={setUsedCommit}
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
      <CardFooter>
        <p>
          {commit === "" ||
          commit === "private" ||
          commit === null ||
          commit === " " ? (
            <Button size="lg" variant={null}>
              <CircleSlash data-icon="inline-start" />
              Commit N/A
            </Button>
          ) : (
            <a
              href={`https://${focusRepo}/${commit}`}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "self-end",
              )}
            >
              <ExternalLink data-icon="inline-start" />
              View Commit
            </a>
          )}
        </p>
      </CardFooter>
    </Card>
  );
};

export default Focus_Entry;
