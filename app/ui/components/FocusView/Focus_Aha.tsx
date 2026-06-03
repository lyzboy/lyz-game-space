"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button, buttonVariants } from "@/components/ui/button";

import { ExternalLink, Lightbulb, CircleSlash } from "lucide-react";
import { Focus } from "@/app/generated/prisma";

import { useSession } from "next-auth/react";
import { useState } from "react";

import Focus_EntryForm from "./Focus_EntryForm";
import Focus_EditControls from "./Focus_EditControls";
import Focus_MarkdownRenderer from "./Focus_MarkdownRenderer";
import { cn } from "@/lib/utils";

interface AhaEntryProps {
  id: number;
  focus: Focus;
  commit: string;
  description: string;
  date: string;
}

const Focus_Aha: React.FC<AhaEntryProps> = ({
  id,
  focus,
  commit,
  description,
  date,
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
          focusId={focus.id}
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
          focusId={focus.id}
          setMarkdown={setMarkdown}
          isEditing={setEditing}
        />
      );
    } else {
      return <Focus_MarkdownRenderer content={content} />;
    }
  };

  return (
    <Card className="border-chart-1 border-4 gap-1">
      <CardHeader>
        <div className="flex gap-2">
          <Lightbulb />
          <p className="font-bold">{date}</p>
        </div>
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
              href={`https://${focus.repositoryUrl}/${commit}`}
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

export default Focus_Aha;
