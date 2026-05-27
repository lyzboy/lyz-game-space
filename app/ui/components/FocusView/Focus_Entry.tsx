// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { proseStyle, buttonStyle } from "@/app/lib/styles";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DeleteEntryButton from "../DeleteEntryButton";
import { auth } from "@/auth";

interface EntryProps {
  id: number;
  focusId: number;
  date: Date;
  description: string;
}

const Focus_Entry: React.FC<EntryProps> = async ({
  date,
  description,
  id,
  focusId,
}) => {
  const session = await auth();
  const content = description;
  return (
    <Card>
      <CardHeader>
        <p className="font-bold">{date.toLocaleDateString()}</p>
        {/* {session?.user?.role === "ADMIN" && ( */}
        <>
          <Button>Edit</Button>
          <DeleteEntryButton id={id} focusId={focusId} />
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
    </Card>
  );
};

export default Focus_Entry;
