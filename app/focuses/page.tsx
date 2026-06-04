import { GetEntries } from "../lib/entries";
import { GetFocuses } from "../lib/focuses";
import { badgeStyle } from "../lib/styles";
import FocusMainCard from "../ui/components/FocusMainCard";

export default async function Focuses() {
  const focuses = await GetFocuses();
  const entries = await GetEntries();
  return (
    <div className="p-32">
      <div className="flex justify-center content-center flex-col mb-10">
        <h1 className="justify-self-start text-3xl mb-6 font-bold">Focuses</h1>
        <p>
          Here you can find all of the projects within my development diary. I
          make a strong effect to keep a running dairy of my projects which
          includes what I accomplished and those Aha! moments so I can look back
          on my growth as a developer.
        </p>
        <p>
          Feel free to browse the focuses to and see what i have been up to!
        </p>
      </div>
      <div className="grid grid-cols-4 gap-8 lg:gap-4">
        <div className=" lg:col-span-1 col-span-full gap-4 flex justify-start items-start">
          <p className={badgeStyle + "w-full"}>
            Number of focuses:{" "}
            <span className="text-blue-500 font-bold">{focuses.length}</span>
          </p>
          <p className={badgeStyle + "w-full"}>
            Number of entries:{" "}
            <span className="text-blue-500 font-bold">{entries.length}</span>
          </p>
        </div>
        <div className="flex gap-2 flex-col lg:col-span-3 col-span-full">
          {focuses.map((focus) => {
            return (
              <div
                key={focus.id}
                className="border-2 p-6 rounded-xl flex
              flex-col"
              >
                <FocusMainCard
                  title={focus.title}
                  description={focus.description}
                  repositoryUrl={focus.repositoryUrl || "#"}
                  technologies={focus.technologies || []}
                  entries={focus.entry}
                  isOnTIL={false}
                  id={focus.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
