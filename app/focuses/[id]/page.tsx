// /focuses/view

import { redirect } from "next/navigation";
import { GetFocusById } from "@/app/lib/focuses";
import Focus_Entry from "@/app/ui/components/FocusView/Focus_Entry";
import Focus_Aha from "@/app/ui/components/FocusView/Focus_Aha";
import Focus_EditorForm from "@/app/ui/components/FocusView/Focus_EditorForm";

const FocusView = async (props: PageProps<"/focuses/[id]">) => {
  const { id } = await props.params;
  const focus = await GetFocusById(Number(id));
  if (!focus) redirect("/focuses");
  return (
    <div className="p-16 pt-24">
      <Focus_EditorForm focus={focus} />
      <div>
        <h2 className="font-bold text-xl">Entries:</h2>
        {focus.entry.map((entry) => {
          return entry.isAha ? (
            <Focus_Aha
              key={entry.id}
              description={entry.description}
              commit={entry.commitUrl}
              id={entry.id}
              focus={focus}
              date={entry.createdAt.toLocaleDateString()}
            />
          ) : (
            <div key={entry.id} className="my-2">
              <Focus_Entry
                id={entry.id}
                focusId={focus.id}
                date={entry.createdAt.toLocaleDateString()}
                description={entry.description}
                commit={entry.commitUrl}
                focusRepo={focus.repositoryUrl!}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FocusView;
