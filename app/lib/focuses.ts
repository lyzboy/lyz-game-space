`server-only`;
import prisma from "@/app/lib/prisma";
import { Focus } from "../generated/prisma";

export async function GetFocuses() {
  try {
    const fetchedFocuses = await prisma.focus.findMany({
      include: { entry: true, technologies: true },
    });
    return fetchedFocuses;
  } catch (error) {
    throw new Error("Failed to fetch focuses");
  }
}

/**
 * Retrieve a specific focus using the focus id. Returns null if no object found
 * @param {number} id - The id of the focus
 * @returns {Focus} The found focus to return.
 */
export async function GetFocusById(id: number) {
  try {
    const fetchedFocus = await prisma.focus.findUnique({
      where: {
        id,
      },
      include: {
        entry: true,
        technologies: true,
      },
    });
    return fetchedFocus;
  } catch (error) {
    throw new Error(`Fails to get focus with id (${id})`);
  }
}
