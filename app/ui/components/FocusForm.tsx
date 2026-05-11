import { createFocus } from "@/app/lib/actions";
import { getTechnologies } from "@/app/lib/technologies";

/**
 * A component used by the admin of the site to create new entries.
 * @returns An entry form component
 */

export default async function FocusForm() {
  const technologies = await getTechnologies();
  return (
    <div className="flex flex-col mb-16 border-2 p-3 rounded-2xl shadow-xl">
      <p className="text-2xl font-bold">Focus Form</p>
      <form action={createFocus} className="flex flex-col">
        <label htmlFor="focusName">Focus Name:</label>
        <input
          className="border-black border-2 rounded-md"
          type="text"
          name="focusName"
        />
        <label htmlFor="focusDescription">Description:</label>
        <textarea
          name="focusDescription"
          rows={4}
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
          placeholder="Write your thoughts here..."
        ></textarea>

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
                  className="mr-2"
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
        font-bold rounded-lg w-50 self-end my-6"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
