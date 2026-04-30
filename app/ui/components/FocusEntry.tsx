import { badgeStyle } from "@/app/lib/prismaStyles";
import React from "react";

interface FocusEntryProps {
  title: string;
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
}

const FocusEntry: React.FC<FocusEntryProps> = ({
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
      <div>
        <p className="font-bold text-xl text-gray-400">
          {isOnTIL && "Current Focus:"}
        </p>
        <p className="font-bold text-2xl mb-6">{title}</p>
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
      <a href={formattedUrl} target="_blank" className="text-blue-400">
        Repo: {repositoryUrl}
      </a>
    </div>
  );
};

export default FocusEntry;
