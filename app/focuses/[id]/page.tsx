// /focuses/view

import { redirect } from "next/navigation";
import { GetFocusById } from "@/app/lib/focuses";
import Entry from "@/app/ui/components/TIL/TIL_Entry";
import AhaEntry from "@/app/ui/components/TIL/TIL_AhaEntry";

const FocusView = async (props: PageProps<"/focuses/[id]">) => {
  const { id } = await props.params;
  const focus = await GetFocusById(Number(id));
  if (!focus) redirect("/focuses");
  return (
    <div className="p-16">
      <a href="/focuses" className="font-bold text-blue-400 mb-6 block">
        Return to Focuses
      </a>
      <div className="mb-6">
        <p className="font-bold text-xl">Title:</p>
        <h1 className="font-bold text-2xl mb-4">{focus.title}</h1>
        <p>{focus.description}</p>
      </div>
      <div>
        <h2 className="font-bold text-xl">Focuses:</h2>
        {focus.entry.map((entry) => {
          return entry.isAha ? (
            <AhaEntry
              key={entry.id}
              description={entry.description}
              focusName=""
              commit={entry.commitUrl}
              isShort={false}
            />
          ) : (
            <div key={entry.id} className="my-2">
              <Entry
                date={entry.createdAt}
                description={entry.description}
                isShort={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FocusView;
