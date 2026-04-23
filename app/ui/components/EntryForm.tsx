import { createEntry } from "@/app/lib/actions";
import { getFocuses } from "@/app/lib/focuses";

/**
 * A component used by the admin of the site to create new entries.
 * @returns An entry form component
 */

export default async function EntryForm() {
  const focuses = await getFocuses();

  return (
    <div className="flex flex-col">
      <p className="text-2xl font-bold">Entry Form</p>
      {focuses.length > 0 ? (
        <form action={createEntry} className="flex flex-col">
          <label htmlFor="selectedFocus">Selected Focus:</label>
          <select
            name="selectedFocus"
            className="border-black border-2 rounded-md"
          >
            {focuses.map((focus) => {
              return (
                <option value={focus.id} key={focus.id.toString()}>
                  {focus.description}
                </option>
              );
            })}
          </select>
          <label htmlFor="entryDescription">Entry Description:</label>
          <textarea
            id="story"
            rows={5}
            cols={33}
            className="border-black border-2 rounded-md"
            name="entryDescription"
          />
          <label htmlFor="commitUrl">Commit URL:</label>
          <input
            className="border-black border-2 rounded-md mb-4"
            type="text"
            name="commitUrl"
          />
          <label htmlFor="isAha">Is Aha?</label>
          <input
            className="border-black border-2 rounded-md mb-4"
            type="checkbox"
            name="isAha"
          />
          <button
            type="submit"
            className="bg-blue-400 p-2 text-white
          font-bold rounded-lg"
          >
            Submit
          </button>
        </form>
      ) : (
        <p>Please Create a Focus first</p>
      )}
    </div>
  );
}
