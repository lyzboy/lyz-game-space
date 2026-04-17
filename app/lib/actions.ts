"use server";
import prisma from "@/app/lib/prisma";

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
  }
  console.log(`${repoName}`);
}
