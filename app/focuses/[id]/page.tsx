// /focuses/view

import { redirect } from "next/navigation";
import { GetFocusById } from "@/app/lib/focuses";
import FocusEntry from "@/app/ui/components/FocusEntry";
import Entry from "@/app/ui/components/Entry";
import AhaEntry from "@/app/ui/components/AhaEntry";

const FocusView = async (props: PageProps<"/focuses/[id]">) => {
  const { id } = await props.params;
  const focus = await GetFocusById(Number(id));
  if (!focus) redirect("/focuses");
  return (
    <div className="p-8">
      <a href="/focuses" className="font-bold text-blue-400">
        Return to Focuses
      </a>
      <FocusEntry
        description={focus.description}
        repositoryUrl={focus.repositoryUrl || "N/A"}
        technologies={focus.technologies}
        isOnTIL={false}
      />
      <div>
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
