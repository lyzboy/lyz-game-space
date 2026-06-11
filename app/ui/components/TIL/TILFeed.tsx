import TIL_Entry from "./TIL_Entry";
import TIL_AhaEntry from "./TIL_AhaEntry";
import prisma from "@/app/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TIL_Focus from "./TIL_Focus";

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
    <Card className="m-2">
      <CardHeader className="text-2xl font-bold">TIL Feed</CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row gap-4">
          <TIL_Focus
            title={newestEntry?.focus.title || "No title found"}
            description={
              newestEntry?.focus.description || "Description Not Found"
            }
            repositoryUrl={newestEntry?.focus.repositoryUrl || "#"}
            technologies={newestEntry?.focus.technologies || []}
            isOnTIL={true}
            id={newestEntry?.focus.id}
          />
          <TIL_Entry
            date={newestEntry?.createdAt}
            description={newestEntry?.description}
            focusId={newestEntry?.focus.id}
          />
        </div>
        <CardTitle className="mt-4 font-bold">Recent Aha Moments:</CardTitle>
        <div className="flex flex-col gap-4 mt-4">
          {newestThreeAhas.map((entry) => {
            return (
              <TIL_AhaEntry
                id={entry.id}
                key={entry.id}
                focus={entry.focus}
                description={entry.description}
                commit={entry.commitUrl}
                date={entry.createdAt}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default TILFeed;
