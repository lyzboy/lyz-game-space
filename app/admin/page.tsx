import EntryForm from "../ui/components/EntryForm";
import FocusForm from "../ui/components/FocusForm";

/**
 * The administration page for the website. This is a protected route.
 * @returns The admin page
 */
export default function Admin() {
  return (
    <div>
      <FocusForm />
      <EntryForm />
    </div>
  );
}
