import { createFocus, getTechnologies } from "@/app/lib/actions";

/**
 * A component used by the admin of the site to create new entries.
 * @returns An entry form component
 */

export default async function FocusForm() {
  const technologies = await getTechnologies();
  return (
    <div className="flex flex-col mb-16">
      <p className="text-2xl font-bold">Focus Form</p>
      <form action={createFocus} className="flex flex-col">
        <label htmlFor="focusName">Focus Name:</label>
        <input
          className="border-black border-2 rounded-md"
          type="text"
          name="focusName"
        />
        <label htmlFor="repoName">Repo Name:</label>
        <input
          className="border-black border-2 rounded-md mb-4"
          type="text"
          name="repoName"
        />
        <div className="grid grid-rows-2 grid-flow-col gap-2">
          {technologies.map((technology) => {
            return (
              <div key={technology.id}>
                <input
                  type="checkbox"
                  name="technologies"
                  id={technology.id.toString()}
                  value={technology.id}
                />
                <label htmlFor={`tech-${technology.id}`}>
                  {technology.name}
                </label>
              </div>
            );
          })}
        </div>
        <button
          type="submit"
          className="bg-blue-400 p-2 text-white
        font-bold rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
