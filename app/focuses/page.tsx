import FocusEntry from "../ui/components/FocusEntry";

export default function Focuses() {
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
      <div className="border-black border-2 p-3 rounded-lg">
        <FocusEntry description="My focus" repositoryUrl="#" />
      </div>
    </div>
  );
}
