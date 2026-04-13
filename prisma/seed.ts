import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
async function main() {
  const testFocus = await prisma.focus.upsert({
    where: { id: 123 },
    update: {},
    create: {
      id: 123,
      description: "This is a test focus",
      repo: "github.com/lyzboy/test",
      technologies: {
        create: [
          {
            name: "Node JS",
          },
          {
            name: "Prisma",
          },
        ],
      },
      entry: {
        create: [
          {
            description: "I found out how to seed prisma.",
            commit: "github.com/lyzboy/test/commit1",
            isAha: true,
          },
          {
            description: "Woking on getting the tests right",
            commit: "github.com/lyzboy/test/commit2",
            isAha: false,
          },
        ],
      },
    },
  });
  const testFocus2 = await prisma.focus.upsert({
    where: { id: 234 },
    update: {},
    create: {
      id: 234,
      description: "More work on prisma",
      repo: "github.com/lyzboy/test",
      technologies: {
        create: [
          {
            name: "Node JS",
          },
          {
            name: "Prisma",
          },
        ],
      },
      entry: {
        create: [
          {
            description: "Need another aha test.",
            commit: "github.com/lyzboy/test/commit3",
            isAha: true,
          },
          {
            description: "Found out how to map with aha entries",
            commit: "github.com/lyzboy/test/commit2",
            isAha: true,
          },
          {
            description: "Need another to ensure only 3 are shown",
            commit: "github.com/lyzboy/test/commit2",
            isAha: true,
          },
        ],
      },
    },
  });
  console.log({ testFocus });
}
main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
