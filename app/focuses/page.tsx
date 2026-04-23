import FocusEntry from "../ui/components/FocusEntry";
import { getFocuses } from "../lib/focuses";

export default async function Focuses() {
  const focuses = await getFocuses();
  return (
    <div className="p-32">
      <div className="flex justify-center content-center flex-col mb-5">
        <h1 className="justify-self-start text-2xl font-bold">Focuses</h1>
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
      <div className="flex gap-2 flex-col">
        {focuses.map((focus) => {
          return (
            <div key={focus.id} className="border-2 p-2 rounded-xl">
              <FocusEntry
                description={focus.description}
                repositoryUrl={focus.repositoryUrl || "#"}
                technologies={focus.technologies || []}
                isOnTIL={false}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
