"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFocus(formData: FormData) {
  const focusName = formData.get("focusName");
  let repoName = formData.get("repoName");

  const selectedTechIds = formData
    .getAll("technologies")
    .map((id) => Number(id));

  if (repoName != null) {
    repoName = repoName.toString().replace(/.*\//gm, "");
    repoName = "github.com/lyzboy/" + repoName;
  }
  if (typeof repoName != "string" || repoName === null) repoName = "";
  if (typeof focusName === "string") {
    const technologyConnections = selectedTechIds.map((id) => ({ id }));
    await prisma.focus.upsert({
      where: {
        description: focusName,
      },
      update: {
        repositoryUrl: repoName,
        technologies: {
          set: technologyConnections,
        },
      },
      create: {
        description: focusName,
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
  try {
    let entryDescription = formData.get("entryDescription");
    const focusId = formData.get("selectedFocus");
    let commitUrl = formData.get("commitUrl");
    const isAhaFromData = formData.get("isAha");

    if (focusId === null || entryDescription === null || commitUrl === null) {
      throw new Error("Missing focusId or description");
    }

    let parsedAha = false;

    if (isAhaFromData != null) parsedAha = true;

    const parsedFocusId = Number.parseFloat(focusId.toString());
    entryDescription = entryDescription.toString();
    commitUrl = commitUrl.toString();

    await prisma.entry.create({
      data: {
        description: entryDescription,
        focusId: parsedFocusId,
        commitUrl: commitUrl,
        isAha: parsedAha,
      },
    });
  } catch (error) {
    console.error(`Couldn't create entry: ${error}`);
  }
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
