import EntryForm from "../ui/components/EntryForm";
import FocusForm from "../ui/components/FocusForm";
import TechnologyForm from "../ui/components/TechnologyForm";

/**
 * The administration page for the website. This is a protected route.
 * @returns The admin page
 */
export default function Admin() {
  return (
    <div className="p-24 grid  grid-cols-1  w-full gap-10 h-screen xl:grid-cols-4">
      <div className="">
        <TechnologyForm />
        <FocusForm />
      </div>
      <div className="col-span-3">
        <EntryForm />
      </div>
    </div>
  );
}
