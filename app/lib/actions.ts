"use server";
import prisma from "@/app/lib/prisma";
import { refresh, revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const requireAdmin = async () => {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return session;
};

export async function createFocus(formData: FormData) {
  try {
    await requireAdmin();
    const focusName = formData.get("focusName");
    const focusDescription = formData.get("focusDescription");
    let repoName = formData.get("repoName");

    const selectedTechIds = formData
      .getAll("technologies")
      .map((id) => Number(id));

    if (repoName != null) {
      repoName = repoName.toString().replace(/.*\//gm, "");
      repoName = "github.com/lyzboy/" + repoName;
    }
    if (typeof repoName != "string" || repoName === null) repoName = "";
    if (typeof focusName === "string" && typeof focusDescription === "string") {
      const technologyConnections = selectedTechIds.map((id) => ({ id }));
      await prisma.focus.upsert({
        where: {
          title: focusName,
        },
        update: {
          repositoryUrl: repoName,
          technologies: {
            set: technologyConnections,
          },
        },
        create: {
          title: focusName,
          description: focusDescription,
          repositoryUrl: repoName,
          technologies: {
            connect: technologyConnections,
          },
        },
      });
      revalidatePath("/admin");
    }
  } catch (error) {
    console.log(`Cannot create focus: ${error}`);
  }
}

export async function UpdateFocus(formData: FormData) {
  try {
    await requireAdmin();
    const rawFocusTitle = formData.get("focusTitle");
    const rawFocusDescription = formData.get("focusDescription");
    const rawFocusId = formData.get("focusId");

    if (
      typeof rawFocusTitle !== "string" ||
      typeof rawFocusDescription !== "string" ||
      typeof rawFocusId !== "string"
    ) {
      throw new Error("Missing required form fields");
    }

    const focusTitle = rawFocusTitle.trim();
    const focusDescription = rawFocusDescription.trim();
    const focusId = Number(rawFocusId);

    if (!focusDescription) {
      throw new Error("Entry description is required");
    }

    if (!focusTitle) {
      throw new Error("Entry title is required");
    }
    if (Number.isNaN(focusId)) {
      throw new Error("Invalid focus id");
    }

    await prisma.focus.update({
      where: {
        id: focusId,
      },
      data: {
        title: focusTitle,
        description: focusDescription,
      },
    });
    refresh();
  } catch (error) {
    console.error(`Couldn't update focus: ${error}`);
  }
}

export async function createEntry(formData: FormData) {
  try {
    await requireAdmin();
    const rawEntryDescription = formData.get("entryDescription");
    const rawFocusId = formData.get("selectedFocus");
    const rawCommitUrl = formData.get("commitUrl");
    const rawIsAha = formData.get("isAha");

    if (
      typeof rawEntryDescription !== "string" ||
      typeof rawFocusId !== "string" ||
      typeof rawCommitUrl !== "string"
    ) {
      throw new Error("Missing required form fields");
    }

    const entryDescription = rawEntryDescription.trim();
    let commitUrl = rawCommitUrl.trim();
    const focusId = Number(rawFocusId);
    const isAha = rawIsAha != null;

    if (!entryDescription) {
      throw new Error("Entry description is required");
    }

    if (!commitUrl) {
      commitUrl = "";
    }

    if (Number.isNaN(focusId)) {
      throw new Error("Invalid focus id");
    }

    await prisma.entry.create({
      data: {
        description: entryDescription,
        focusId,
        commitUrl,
        isAha,
      },
    });
  } catch (error) {
    console.error(`Couldn't create entry: ${error}`);
  }
  revalidatePath("/");
  redirect("/");
}

export async function UpdateEntry(formData: FormData) {
  try {
    await requireAdmin();
    const rawEntryDescription = formData.get("entryDescription");
    const rawId = formData.get("entryId");
    const rawFocusId = formData.get("focusId");
    const rawCommit = formData.get("entryCommit");

    if (
      typeof rawEntryDescription !== "string" ||
      typeof rawId !== "string" ||
      typeof rawFocusId !== "string" ||
      typeof rawCommit !== "string"
    ) {
      throw new Error("Missing required form fields");
    }

    const entryDescription = rawEntryDescription.trim();
    const entryId = Number(rawId);
    const focusId = Number(rawFocusId);

    if (!entryDescription) {
      throw new Error("Entry description is required");
    }

    if (Number.isNaN(entryId)) {
      throw new Error("Invalid entry id");
    }

    if (Number.isNaN(focusId)) {
      throw new Error("Invalid focus id");
    }

    await prisma.entry.update({
      where: {
        id: entryId,
      },
      data: {
        description: rawEntryDescription,
        commitUrl: rawCommit,
      },
    });
    refresh();
  } catch (error) {
    console.error(`Couldn't update entry: ${error}`);
  }
}

export async function createTechnology(formData: FormData) {
  try {
    await requireAdmin();
    const technologyName = formData.get("technologyName");
    if (!technologyName || typeof technologyName !== "string")
      throw new Error("Technology name is required and must be a text value.");
    await prisma.technology.create({
      data: {
        name: technologyName,
      },
    });
    revalidatePath("/admin");
  } catch (error) {
    throw new Error(`Failed to create technology: ${error}`);
  }
}

export async function FindTotalDaysFromEntries(entriesDates: string[]) {
  try {
    if (entriesDates.length <= 1) {
      return 1;
    }
    entriesDates.sort();
    const min: Date = new Date(entriesDates[0]);
    const max: Date = new Date(entriesDates.at(-1)!);

    const milliSeconds: number = max.getTime() - min.getTime();
    let days = Math.ceil(milliSeconds / 1000 / 60 / 60 / 24);
    if (days < 1) days = 1;
    return days;
  } catch (error) {
    console.log(`Error finding total days: ${error}`);
    return 0;
  }
}

export async function DeleteEntryById(id: number, focusId: number) {
  try {
    await requireAdmin();
    await prisma.entry.delete({
      where: {
        id,
      },
    });
    revalidatePath(`/focuses/${focusId}`);
  } catch (error) {
    throw new Error(`Failed to delete entry with id (${id}): ${error}`);
  }
}
