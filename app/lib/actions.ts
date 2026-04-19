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

export async function getFocuses() {
  try {
    const fetchedFocuses = await prisma.focus.findMany({
      include: { entry: true },
    });
    return fetchedFocuses;
  } catch (error) {
    throw new Error("Failed to fetch focuses");
  }
}
