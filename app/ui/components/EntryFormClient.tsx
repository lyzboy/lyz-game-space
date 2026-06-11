"use client";

import { useState } from "react";
import { createEntry } from "@/app/lib/actions";
import { ForwardRefEditor } from "./ForwardRefEditor";

type Focus = {
  id: number;
  title: string;
  description: string;
};

export default function EntryFormClient({ focuses }: { focuses: Focus[] }) {
  const [markdown, setMarkdown] = useState("");

  return (
    <div className="flex flex-col h-full">
      <p className="text-2xl font-bold">Entry Form</p>

      {focuses.length > 0 ? (
        <form action={createEntry} className="flex flex-col gap-2 h-full">
          <label htmlFor="selectedFocus" className="text-lg font-bold">
            Selected Focus:
          </label>
          <select
            id="selectedFocus"
            name="selectedFocus"
            className="border-black border-2 rounded-md text-2xl font-bold bg-blue-200"
          >
            {focuses.map((focus) => (
              <option value={focus.id} key={focus.id}>
                {focus.title}
              </option>
            ))}
          </select>

          <label htmlFor="entryDescription" className="text-lg font-bold">
            Entry Description:
          </label>
          <div className="border-black border-2 rounded-md overflow-hidden grow-10">
            <ForwardRefEditor markdown={markdown} onChange={setMarkdown} />
          </div>

          <input
            type="hidden"
            name="entryDescription"
            value={markdown}
            readOnly
          />
          <div className="flex justify-between my-6">
            <div className="flex gap-5">
              <label htmlFor="commitUrl" className="m-auto text-lg font-bold">
                Commit URL:
              </label>
              <input
                id="commitUrl"
                className="border-black border-2 rounded-md"
                type="text"
                name="commitUrl"
              />
              <p>Be sure to include: commit/...</p>
            </div>
            <div className="flex gap-5 items-center">
              <label htmlFor="isAha" className="text-lg font-bold">
                Is Aha?
              </label>
              <input
                id="isAha"
                className="border-black border-2 rounded-md w-7 h-7"
                type="checkbox"
                name="isAha"
                value="true"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-400 p-2 text-white font-bold rounded-lg w-50
            self-end"
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
