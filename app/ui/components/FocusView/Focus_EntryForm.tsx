import React, { Dispatch } from "react";
import { UpdateEntry } from "@/app/lib/actions";
import { ForwardRefEditor } from "../ForwardRefEditor";
import { Button } from "@/components/ui/button";

interface Focus_EntryFormProps {
  markdown: string;
  entryId: number;
  setMarkdown: Dispatch<React.SetStateAction<string>>;
  focusId: number;
  isEditing: Dispatch<React.SetStateAction<boolean>>;
}

const Focus_EntryForm: React.FC<Focus_EntryFormProps> = ({
  markdown,
  entryId,
  setMarkdown,
  focusId,
  isEditing,
}) => {
  return (
    <form
      action={(formData) => {
        UpdateEntry(formData);
        isEditing(false);
      }}
      className="flex flex-col gap-4"
    >
      <div className="border-black border-2 rounded-md overflow-hidden grow-10">
        <ForwardRefEditor markdown={markdown} onChange={setMarkdown} />
      </div>
      <input type="hidden" name="entryDescription" value={markdown} readOnly />
      <input type="hidden" name="entryId" value={entryId} readOnly />
      <input type="hidden" name="focusId" value={focusId} readOnly />
      <Button type="submit">Save Changes</Button>
    </form>
  );
};

export default Focus_EntryForm;
