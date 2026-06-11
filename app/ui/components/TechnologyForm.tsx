import { createTechnology } from "@/app/lib/actions";

/**
 * A form that allows the admin to create a technology item.
 * @returns An technology form component
 */

export default function TechnologyForm() {
  return (
    <div className="flex flex-col mb-16 border-2 p-3 rounded-2xl shadow-xl">
      <p className="text-2xl font-bold">Technology Form</p>
      <form action={createTechnology} className="flex flex-col">
        <label htmlFor="technologyName" className="font-bold text-lg my-4">
          Technology Name:
        </label>
        <input
          className="border-black border-2 rounded-md"
          type="text"
          name="technologyName"
        />
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
