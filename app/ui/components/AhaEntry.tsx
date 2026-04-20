import { formatShortDescription } from "@/app/lib/utils";

interface AhaEntryProps {
  focusName: string;
  commit: string;
  description: string;
}

const AhaEntry: React.FC<AhaEntryProps> = ({
  focusName,
  commit,
  description,
}) => {
  return (
    <div
      className="border-2 p-2 rounded-2xl mt-1 mb-1 bg-amber-100 
    border-amber-200 flex flex-row justify-start content-center"
    >
      <div className="mr-4 p-3 flex justify-center content-center">
        <p className="text-4xl mt-auto mb-auto">!</p>
      </div>
      <div className="flex justify-center content-center flex-col">
        <p>Focus: {focusName}</p>
        <a href="#" className="text-blue-400">
          Commit: {commit}
        </a>
        <p>{formatShortDescription(description)}</p>
      </div>
    </div>
  );
};

export default AhaEntry;
