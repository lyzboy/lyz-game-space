// app/ui/components/EntryForm.tsx
import { GetFocuses } from "@/app/lib/focuses";
import EntryFormClient from "./EntryFormClient";

export default async function EntryForm() {
  const focuses = await GetFocuses();
  return <EntryFormClient focuses={focuses} />;
}
