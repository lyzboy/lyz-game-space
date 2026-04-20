// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";

interface EntryProps {
  date: Date;
  description: string;
}

const Entry: React.FC<EntryProps> = ({ date, description }) => {
  return (
    <div className="border-2 p-2 rounded-2xl">
      <p className="font-bold">Entry Date: {date.toDateString()}</p>
      <p>{formatShortDescription(description)}</p>
    </div>
  );
};

export default Entry;
