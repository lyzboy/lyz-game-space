import { proseStyle } from "@/app/lib/styles";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";
import { Focus } from "@/app/generated/prisma";
import { auth } from "@/auth";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AhaEntryProps {
  id: number;
  focus: Focus;
  commit: string;
  description: string;
  date: Date;
}

const Focus_Aha: React.FC<AhaEntryProps> = async ({
  id,
  focus,
  commit,
  description,
  date,
}) => {
  const session = await auth();
  const content = description;

  function handleDeleteClick() {}
  return (
    <Card className="border-chart-1 border-4 gap-1">
      <CardHeader>
        <div className="flex gap-2">
          <Lightbulb />
          <p className="font-bold">{date.toLocaleDateString()}</p>
        </div>
        {/* {session?.user?.role === "ADMIN" && ( */}
        <>
          <Button>Edit</Button>
          <AlertDialog>
            <AlertDialogTrigger
              render={<Button variant="destructive">Delete</Button>}
            />
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
        {/* )} */}
      </CardHeader>
      <CardContent>
        <article className={proseStyle}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {content}
          </Markdown>
        </article>
      </CardContent>
      <CardFooter>
        <p>Commit:{focus.repositoryUrl + commit}</p>
      </CardFooter>
    </Card>
  );
};

export default Focus_Aha;
