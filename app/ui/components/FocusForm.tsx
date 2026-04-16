/**
 * A component used by the admin of the site to create new entries.
 * @returns An entry form component
 */

export default function FocusForm() {
  return (
    <div>
      <p>Focus Form</p>
      <form action="">
        <label htmlFor="focusName">Focus Name:</label>
        <input
          className="border-black border-2 rounded-md"
          type="text"
          name="focusName"
        />
        <label htmlFor="repoName">Repo Name:</label>
        <input
          className="border-black border-2 rounded-md"
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
