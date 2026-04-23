`server-only`;
import prisma from "@/app/lib/prisma";

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
