import Entry from "../components/Entry";
import AhaEntry from "../components/AhaEntry";
import prisma from "@/app/lib/prisma";
import FocusEntry from "../components/FocusEntry";

const TILFeed = async () => {
  const newestEntry = await prisma.entry.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      isAha: false,
    },
    include: {
      focus: {
        include: {
          technologies: true,
        },
      },
    },
  });
  const newestThreeAhas = await prisma.entry.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
    where: { isAha: true },
    include: { focus: true },
  });

  if (!newestEntry) {
    return (
      <div className="mt-10 mb-10 border-blue-400 border-2 rounded-2xl p-5">
        <h2 className="text-2xl font-bold">TIL Feed</h2>
        <p>
          This section is the Today I Learned (TIL) feed. It provides insights
          into my progress as I develop projects. Currently, there are no
          entries in my development diary. Feel free to explore the site and
          check back for updates on my development journey.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 mb-10 border-blue-400 border-2 rounded-2xl p-5">
      <div className="flex justify-center mb-4">
        <h2 className="text-2xl font-bold">TIL Feed</h2>
      </div>
      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="border-blue-400 border-2 rounded-2xl p-3 w-full bg-blue-100">
          <FocusEntry
            title={newestEntry?.focus.title || "No title found"}
            description={
              newestEntry?.focus.description || "Description Not Found"
            }
            repositoryUrl={newestEntry?.focus.repositoryUrl || "#"}
            technologies={newestEntry?.focus.technologies || []}
            isOnTIL={true}
            id={newestEntry?.focus.id}
          />
        </div>
        <div className="w-full border-blue-400 border-2 rounded-2xl p-3 flex flex-col justify-between">
          <div className="flex flex-row justify-between items-center">
            <div className="w-15 h-15 rounded-full border-blue-400 border-2 mr-3 flex justify-center items-center">
              <span className="material-symbols-outlined text-blue-400">
                auto_stories
              </span>
            </div>
            <p className="font-bold text-lg">Latest Entry</p>
          </div>

          <Entry
            date={newestEntry?.createdAt || new Date()}
            description={newestEntry?.description || "not found"}
            isShort={true}
          />
        </div>
      </div>
      <div>
        <p className="font-bold mt-3 text-lg">Recent Aha! Moments:</p>
        <div className="flex w-full flex-col">
          {newestThreeAhas.map((entry) => {
            return (
              <AhaEntry
                key={entry.id}
                focusName={entry.focus.title}
                commit={entry.commitUrl}
                description={entry.description}
                isShort={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TILFeed;
