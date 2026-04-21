import EntryForm from "../ui/components/EntryForm";
import FocusForm from "../ui/components/FocusForm";
import TechnologyForm from "../ui/components/TechnologyForm";

/**
 * The administration page for the website. This is a protected route.
 * @returns The admin page
 */
export default function Admin() {
  return (
    <div className="p-32">
      <TechnologyForm />
      <FocusForm />
      <EntryForm />
    </div>
  );
}
