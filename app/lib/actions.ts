"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createFocus(formData: FormData) {
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
}

export async function createEntry(formData: FormData) {
  console.log(`Trying to create entry...`);
  try {
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

export async function createTechnology(formData: FormData) {
  try {
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
