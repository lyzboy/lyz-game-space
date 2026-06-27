import EntryForm from "../ui/components/EntryForm";
import FocusForm from "../ui/components/FocusForm";
import TechnologyForm from "../ui/components/TechnologyForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Admin() {
  // const session = await auth();
  // if (session?.user?.role !== "ADMIN") {
  //   console.log(`not an admin`);
  //   redirect("/");
  // }
  return (
    <div className="p-6 grid  grid-cols-1  w-full gap-10 h-screen xl:grid-cols-4 mt-15">
      <div className="flex gap-6 flex-col col-span-3 lg:col-span-1 w-full">
        <TechnologyForm />
        <FocusForm />
      </div>
      <div className="col-span-3">
        <EntryForm />
      </div>
    </div>
  );
}
