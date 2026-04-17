import { createFocus } from "@/app/lib/actions";

/**
 * A component used by the admin of the site to create new entries.
 * @returns An entry form component
 */

export default function FocusForm() {
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
