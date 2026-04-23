`server-only`;
import prisma from "@/app/lib/prisma";

export async function getTechnologies() {
  try {
    const fetchedTechnologies = await prisma.technology.findMany();
    return fetchedTechnologies;
  } catch (error) {
    throw new Error("Failed to fetch focuses");
  }
}
