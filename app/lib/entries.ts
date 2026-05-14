`server-only`;
import prisma from "@/app/lib/prisma";

export async function GetEntries() {
  try {
    const fetchedEntry = await prisma.entry.findMany({
      include: { focus: true },
    });
    return fetchedEntry;
  } catch (error) {
    throw new Error("Failed to fetch entries");
  }
}

/**
 * Retrieve a specific focus using the focus id. Returns null if no object found
 * @param {number} id - The id of the focus
 * @returns {Focus} The found focus to return.
 */
export async function GetEntryByID(id: number) {
  try {
    const fetchedEntry = await prisma.entry.findUnique({
      where: {
        id,
      },
      include: {
        focus: true,
      },
    });
    return fetchedEntry;
  } catch (error) {
    throw new Error(`Fails to get entry with id (${id})`);
  }
}
