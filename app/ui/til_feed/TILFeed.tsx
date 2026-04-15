import Entry from "../components/Entry";
import AhaEntry from "../components/AhaEntry";
import prisma from "@/app/lib/prisma";

const TILFeed = async () => {
  const allFocus = await prisma.focus.findFirst({
    include: { entry: true, technologies: true },
  });
  const newestThreeAhas = await prisma.entry.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc", // Or 'createdAt' if you have a timestamp field
    },
    where: { isAha: true },
    include: { focus: true },
  });
  return (
    <div className="mt-10 mb-10 border-blue-400 border-2 rounded-2xl p-5">
      <h2 className="text-2xl font-bold">Today I Learned Feed</h2>
      <div>
        <p className="font-bold text-xl">
          Current Focus: {allFocus?.description}
        </p>
        {/* this will be for badges */}
        <div></div>
      </div>
      <a href={allFocus?.repositoryUrl || "#"} className="text-blue-400">
        Repo: {allFocus?.repositoryUrl}
      </a>

      <p className="font-bold mt-3 text-lg">Latest Entry:</p>
      <Entry
        date={allFocus?.entry[1].createdAt || new Date()}
        description={allFocus?.entry[1].description || "not found"}
      />
      <div>
        <p className="font-bold mt-3 text-lg">Recent Aha! Moments:</p>
        {newestThreeAhas.map((entry) => {
          return (
            <AhaEntry
              key={entry.id}
              focusName={entry.focus.description}
              commit={entry.commitUrl}
              description={entry.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TILFeed;
