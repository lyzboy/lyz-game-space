import { badgeStyle, buttonStyle } from "@/app/lib/styles";
import { formatShortDescription } from "@/app/lib/utils";
import React from "react";

interface FocusEntryProps {
  id: number;
  title: string;
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
}

const FocusEntry: React.FC<FocusEntryProps> = ({
  id,
  title,
  description,
  repositoryUrl,
  technologies,
  isOnTIL = false,
}) => {
  const formattedUrl = repositoryUrl.startsWith("http")
    ? repositoryUrl
    : `https://${repositoryUrl}`;
  return (
    <div>
      <div className="mb-6">
        <p className="font-bold text-xl text-gray-400">
          {isOnTIL && "Current Focus:"}
        </p>
        <p className="font-bold text-2xl mb-6">{title}</p>
        <p>{formatShortDescription(description)}</p>
        <div className="flex gap-4  my-2 text-sm font-bold mb-6">
          {technologies.map((technology) => {
            return (
              <p key={technology.id} className={badgeStyle}>
                {technology.name}
              </p>
            );
          })}
        </div>
      </div>
      <div className="flex gap-3 justify-between">
        <a className={buttonStyle} href={formattedUrl} target="_blank">
          Visit Repo
        </a>
        <a className={buttonStyle} href={`/focuses/${id}`}>
          Quick View
        </a>
      </div>
    </div>
  );
};

export default FocusEntry;
