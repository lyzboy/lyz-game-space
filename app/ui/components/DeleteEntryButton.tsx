`use client`;

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

import { DeleteEntryById } from "@/app/lib/entries";

import { Button } from "@/components/ui/button";

interface DeleteEntryButtonProps {
  id: number;
}

const DeleteEntryButton: React.FC<DeleteEntryButtonProps> = ({ id }) => {
  const deleteEntryById = DeleteEntryById.bind(null, id);
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="destructive">Delete</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the item.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={deleteEntryById}>
            <AlertDialogAction variant="destructive" type="submit">
              Delete
            </AlertDialogAction>
          </form>
          {/* TODO: close dialog box after delete, might happen with revalidate path */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteEntryButton;
