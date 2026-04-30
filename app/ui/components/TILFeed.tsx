import Entry from "../components/Entry";
import AhaEntry from "../components/AhaEntry";
import prisma from "@/app/lib/prisma";
import FocusEntry from "../components/FocusEntry";

const TILFeed = async () => {
  const newestEntry = await prisma.entry.findFirst({
    orderBy: {
      createdAt: "desc",
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
      <h2 className="text-2xl font-bold">TIL Feed</h2>

      <FocusEntry
        title={newestEntry?.focus.title || "No title found"}
        description={newestEntry?.focus.description || "Description Not Found"}
        repositoryUrl={newestEntry?.focus.repositoryUrl || "#"}
        technologies={newestEntry?.focus.technologies || []}
        isOnTIL={true}
      />

      <p className="font-bold mt-3 text-lg">Latest Entry:</p>
      <Entry
        date={newestEntry?.createdAt || new Date()}
        description={newestEntry?.description || "not found"}
        isShort={true}
      />
      <div>
        <p className="font-bold mt-3 text-lg">Recent Aha! Moments:</p>
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
  );
};

export default TILFeed;
