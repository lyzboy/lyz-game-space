"use client";

import { Button } from "@/components/ui/button";
import DeleteEntryButton from "../DeleteEntryButton";

interface Focus_EditControlsProps {
  isEditing: boolean;
  handleEditClick: () => void;
  entryId: number;
  focusId: number;
}

const Focus_EditControls: React.FC<Focus_EditControlsProps> = ({
  isEditing,
  handleEditClick,
  entryId,
  focusId,
}) => {
  const selectControls = () => {
    if (isEditing) {
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
          <DeleteEntryButton id={entryId} focusId={focusId} />
        </>
      );
    }
  };
  return selectControls();
};

export default Focus_EditControls;
