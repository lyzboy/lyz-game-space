import { GetFocuses } from "../lib/focuses";
import { buttonStyle } from "../lib/prismaStyles";
import FocusMainCard from "../ui/components/FocusMainCard";

export default async function Focuses() {
  const focuses = await GetFocuses();
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
      <div className="grid grid-cols-4">
        <div>
          <div>
            <p>Number of focuses: 6</p>
            <p>Number of entries: 234</p>
          </div>
        </div>
        <div className="flex gap-2 flex-col col-span-3">
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
                />
                <a
                  href={`focuses/${focus.id}`}
                  className={`${buttonStyle} self-end`}
                >
                  Visit Focus
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
