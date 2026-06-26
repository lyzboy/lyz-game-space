"use client";

import { Focus, Prisma } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Field, FieldLabel, FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UpdateFocus } from "@/app/lib/actions";
import { Badge } from "@/components/ui/badge";

type FocusWithTechnologies = Prisma.FocusGetPayload<{
  include: { technologies: true };
}>;

interface Focus_EditorFormProps {
  focus: FocusWithTechnologies;
  technologies: { name: string; id: number }[];
}

/**
 * A form used to make edits to a focus
 */
const Focus_EditorForm: React.FC<Focus_EditorFormProps> = ({
  focus,
  technologies,
}) => {
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

  const renderedFocusView = (
    <div className="mb-6">
      <h1 className="font-bold text-2xl mb-4">{focus.title}</h1>
      <div className="flex mb-4">
        {focus.technologies?.map((technology) => {
          return (
            <Badge key={technology.id} variant={"secondary"}>
              {technology.name}
            </Badge>
          );
        })}
      </div>
      <p>{focus.description}</p>
    </div>
  );

  const selectView = () => {
    if (session?.user?.role !== "ADMIN") {
      return renderedFocusView;
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
              <div className="grid grid-rows-2 grid-flow-col gap-2">
                {technologies.map((technology) => {
                  return (
                    <div key={technology.id}>
                      <input
                        type="checkbox"
                        name="technologies"
                        id={technology.id.toString()}
                        value={technology.id}
                        className="mr-2"
                        defaultChecked={focus.technologies.some(
                          (element) => element.id === technology.id,
                        )}
                      />
                      <label htmlFor={`tech-${technology.id}`}>
                        {technology.name}
                      </label>
                    </div>
                  );
                })}
              </div>
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            renderedFocusView
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
