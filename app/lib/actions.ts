"use server";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFocus(formData: FormData) {
  const focusName = formData.get("focusName");
  let repoName = formData.get("repoName");
  if (repoName != null) {
    repoName = repoName.toString().replace(/.*\//gm, "");
    repoName = "github.com/lyzboy/" + repoName;
  }
  if (typeof repoName != "string" || repoName === null) repoName = "";
  if (typeof focusName === "string") {
    const newFocus = await prisma.focus.upsert({
      where: {
        description: focusName,
      },
      update: {
        repositoryUrl: repoName,
      },
      create: {
        description: focusName,
        repositoryUrl: repoName,
      },
    });
    revalidatePath("/admin");
  }
  console.log(`${repoName}`);
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

    const newEntry = await prisma.entry.create({
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

export async function getFocuses() {
  try {
    const fetchedFocuses = await prisma.focus.findMany({
      include: { entry: true, technologies: true },
    });
    return fetchedFocuses;
  } catch (error) {
    throw new Error("Failed to fetch focuses");
  }
}
