// A TIL Feed entry

import { formatShortDescription } from "@/app/lib/utils";

interface EntryProps {
  date: Date;
  description: string;
  isShort: boolean;
}

const Entry: React.FC<EntryProps> = ({ date, description, isShort }) => {
  return (
    <div className="border-2 p-2 rounded-2xl">
      <p className="font-bold">Entry Date: {date.toDateString()}</p>
      {isShort ? (
        <p>{formatShortDescription(description)}</p>
      ) : (
        <p>{description}</p>
      )}
    </div>
  );
};

export default Entry;
