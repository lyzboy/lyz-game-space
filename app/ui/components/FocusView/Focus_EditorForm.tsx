"use client";

import { Focus } from "@/app/generated/prisma";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFocus } from "@/app/lib/actions";

interface Focus_EditorFormProps {
  focus: Focus;
}

const Focus_EditorForm: React.FC<Focus_EditorFormProps> = ({ focus }) => {
  const { data: session } = useSession();

  const [focusTitle, setFocusTitle] = useState(focus.title);
  const [focusDescription, setFocusDescription] = useState(focus.description);

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFocusTitle(focus.title);
      setFocusDescription(focus.description);
    }
  };

  const selectView = () => {
    if (session?.user?.role !== "ADMIN") {
      return (
        <div className="mb-6">
          <p className="font-bold text-xl">Title:</p>
          <h1 className="font-bold text-2xl mb-4">{focus.title}</h1>
          <p>{focus.description}</p>
        </div>
      );
    } else {
      return (
        <div className="w-full mb-6">
          {selectControls()}
          {isEditing ? (
            <form
              action={(formData) => {
                UpdateFocus(formData);
                setIsEditing(false);
              }}
              className="w-full flex flex-col gap-8"
            >
              <input type="hidden" name="focusId" value={focus.id} readOnly />
              <Field>
                <FieldLabel htmlFor="focusTitle">Title:</FieldLabel>
                <Input
                  type="text"
                  name="focusTitle"
                  id="focusTitle"
                  value={focusTitle}
                  onChange={(e) => {
                    setFocusTitle(e.target.value);
                  }}
                  className="block"
                />
                <FieldDescription>
                  Edit the existing focus title.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="focusDescription">Description:</FieldLabel>
                <Textarea
                  name="focusDescription"
                  id="focusDescription"
                  value={focusDescription}
                  onChange={(e) => {
                    setFocusDescription(e.target.value);
                  }}
                />
                <FieldDescription>
                  Edit the existing focus description.
                </FieldDescription>
              </Field>
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <div className="mb-6">
              <p className="font-bold text-xl">Title:</p>
              <h1 className="font-bold text-2xl mb-4">{focus.title}</h1>
              <p>{focus.description}</p>
            </div>
          )}
        </div>
      );
    }
  };

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
        </>
      );
    }
  };
  return selectView();
};

export default Focus_EditorForm;
