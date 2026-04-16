import React from "react";

interface FocusEntryProps {
  description: string;
  repositoryUrl: string;
}

const FocusEntry: React.FC<FocusEntryProps> = ({
  description,
  repositoryUrl,
}) => {
  return (
    <div>
      <div>
        <p className="font-bold text-xl">Current Focus: {description}</p>
        {/* this will be for badges */}
        <div></div>
      </div>
      <a href={repositoryUrl} className="text-blue-400">
        Repo: {repositoryUrl}
      </a>
    </div>
  );
};

export default FocusEntry;
