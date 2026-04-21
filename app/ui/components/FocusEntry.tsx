import React from "react";

interface FocusEntryProps {
  description: string;
  repositoryUrl: string;
  technologies: { name: string; id: number }[];
  isOnTIL: boolean;
}

const FocusEntry: React.FC<FocusEntryProps> = ({
  description,
  repositoryUrl,
  technologies,
  isOnTIL = false,
}) => {
  const badgeColors = [
    "bg-blue-300",
    "bg-red-400",
    "bg-orange-400",
    "bg-green-400",
    "bg-yellow-400",
  ];
  const formattedUrl = repositoryUrl.startsWith("http")
    ? repositoryUrl
    : `https://${repositoryUrl}`;
  return (
    <div>
      <div>
        <p className="font-bold text-xl">
          {" "}
          {isOnTIL && "Current Focus:"} {description}
        </p>

        {/* this will be for badges */}
        <div className="flex gap-4  my-2 text-sm font-bold">
          {technologies.map((technology) => {
            return (
              <p
                key={technology.id}
                className={`
                  ${badgeColors[Math.floor(Math.random() * badgeColors.length)]} 
                  px-2 rounded-xl`}
              >
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
