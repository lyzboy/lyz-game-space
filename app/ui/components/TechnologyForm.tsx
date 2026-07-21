import { createTechnology } from "@/app/lib/actions";
import { Card, CardHeader } from "@/components/ui/card";

/**
 * A form that allows the admin to create a technology item.
 * @returns An technology form component
 */

export default function TechnologyForm() {
  return (
    <Card className="p-6">
      <CardHeader className="text-2xl font-bold">Technology Form</CardHeader>
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
    </Card>
  );
}
